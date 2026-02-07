const prisma = require("../prismaClient");
const logger = require("../utils/logger");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwt");
const { Prisma } = require("@prisma/client");

const registerUser = async (req, res) => {
  logger.info("start registerUser");
  try {
    const { name, login_name, security_question_id, security_answer } =
      req.body;

    if (!name || !login_name || !security_question_id || !security_answer) {
      logger.info("registerUser: Missing required fields");
      return res.status(400).json({
        status: "error",
        message:
          "名前、ログイン名、セキュリティ質問、セキュリティ回答は必須です",
      });
    }

    if (IsString(login_name)){
      logger.info("registerUser: login_name not string.");
      return res.status(400).json({
        status: "error",
        message:"ログイン名は文字列である必要があります。"
      });
    }

    if (login_name.length < 3 || login_name.length > 255) {
      logger.info("registerUser: Invalid login_name length");
      return res.status(400).json({
        status: "error",
        message: "ログイン名は3文字以上255文字以下である必要があります",
      });
    }

    if (security_answer.length < 1) {
      logger.info("registerUser: Security answer is empty");
      return res.status(400).json({
        status: "error",
        message: "セキュリティ回答は必須です",
      });
    }

    const questionExists = await prisma.security_questions.findUnique({
      where: { id: security_question_id },
    });

    if (!questionExists) {
      logger.info(
        `registerUser: Security question not found: ${security_question_id}`,
      );
      return res.status(404).json({
        status: "error",
        message: "指定されたセキュリティ質問が存在しません",
      });
    }

    const result = await prisma.$transaction(async (tx) => {
      const newUser = await tx.users.create({
        data: {
          name,
          login_name,
        },
        select: {
          id: true,
          name: true,
          login_name: true,
          created_at: true,
        },
      });

      const salt = await bcrypt.genSalt(10);
      const answerHash = await bcrypt.hash(security_answer, salt);
      const qid = parseInt(security_question_id);
      await tx.security_question_answers.create({
        data: {
          question_id: qid,
          user_id: newUser.id,
          answer_salt: salt,
          answer_hash: answerHash,
        },
      });

      return newUser;
    });

    const token = generateToken({
      id: result.id,
      login_name: result.login_name,
    });

    logger.info(
      `registerUser: Successfully registered user with ID: ${result.id}`,
    );
    res.status(201).json({
      status: "success",
      message: "ユーザー登録が完了しました",
      data: {
        user: result,
        token,
      },
    });
  } catch (error) {
    logger.error("registerUser: Error occurred:", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        logger.info("registerUser: Duplicate login_name");
        return res.status(409).json({
          status: "error",
          message: "このログイン名は既に使用されています",
        });
      }
    }
    res.status(500).json({ status: "error", message: "サーバーエラー" });
  } finally {
    logger.info("end registerUser");
  }
};

const loginUser = async (req, res) => {
  logger.info("start loginUser");
  try {
    const { login_name, security_answer } = req.body;

    // バリデーション
    if (!login_name || !security_answer) {
      logger.info("loginUser: Missing required fields");
      return res.status(400).json({
        status: "error",
        message: "ログイン名とセキュリティ回答は必須です",
      });
    }

    // ユーザーの存在確認
    const user = await prisma.users.findUnique({
      where: {
        login_name,
        deleted_at: null,
      },
    });

    if (!user) {
      logger.info(`loginUser: User not found: ${login_name}`);
      return res.status(401).json({
        status: "error",
        message: "ログイン名またはセキュリティ回答が正しくありません",
      });
    }

    // セキュリティ回答の取得
    const securityAnswer = await prisma.security_question_answers.findFirst({
      where: { user_id: user.id },
    });

    if (!securityAnswer) {
      logger.info(`loginUser: Security answer not found for user: ${user.id}`);
      return res.status(401).json({
        status: "error",
        message: "ログイン名またはセキュリティ回答が正しくありません",
      });
    }

    // セキュリティ回答の検証
    const isValid = await bcrypt.compare(
      security_answer,
      securityAnswer.answer_hash,
    );

    if (!isValid) {
      logger.info(`loginUser: Invalid security answer for user: ${user.id}`);
      return res.status(401).json({
        status: "error",
        message: "ログイン名またはセキュリティ回答が正しくありません",
      });
    }

    // JWTトークン生成
    const token = generateToken({
      id: user.id,
      login_name: user.login_name,
    });

    logger.info(`loginUser: Successfully logged in user with ID: ${user.id}`);
    res.status(200).json({
      status: "success",
      message: "ログインしました",
      data: {
        user: {
          id: user.id,
          name: user.name,
          login_name: user.login_name,
        },
        token,
      },
    });
  } catch (error) {
    logger.error("loginUser: Error occurred:", error);
    res.status(500).json({ status: "error", message: "サーバーエラー" });
  } finally {
    logger.info("end loginUser");
  }
};

const getSecurityQuestion = async (req, res) => {
  logger.info("start getSecurityQuestion");
  try {
    // 削除されていないセキュリティ質問を全て取得
    const questions = await prisma.security_questions.findMany({
      where: {
        deleateed_at: null,
      },
      select: {
        id: true,
        question: true,
      },
      orderBy: {
        id: "asc",
      },
    });

    logger.info(
      `getSecurityQuestion: Successfully fetched ${questions.length} questions`,
    );
    res.status(200).json({
      status: "success",
      data: questions,
    });
  } catch (error) {
    logger.error("getSecurityQuestion: Error occurred:", error);
    res.status(500).json({ status: "error", message: "サーバーエラー" });
  } finally {
    logger.info("end getSecurityQuestion");
  }
};

const logoutUser = async (req, res) => {
  logger.info("start logoutUser");
  try {
    // JWTベースの認証では、ログアウトは主にクライアント側でトークンを削除することで実現
    // サーバー側ではログアウトの記録のみを行う

    // 認証ミドルウェアからユーザー情報を取得（実装されている場合）
    const userId = req.user?.id;

    if (userId) {
      logger.info(`logoutUser: User ${userId} logged out`);
    } else {
      logger.info("logoutUser: Logout request received (no user info)");
    }

    res.status(200).json({
      status: "success",
      message: "ログアウトしました",
    });
  } catch (error) {
    logger.error("logoutUser: Error occurred:", error);
    res.status(500).json({ status: "error", message: "サーバーエラー" });
  } finally {
    logger.info("end logoutUser");
  }
};

module.exports = {
  registerUser,
  loginUser,
  getSecurityQuestion,
  logoutUser,
};
