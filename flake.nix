{
  description = "Study Habit Management Project Environment (M3 Native)";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
  };

  outputs = inputs@{ self, nixpkgs, ... }:
    let
      system = "aarch64-darwin"; # M3 Mac用
      pkgs = nixpkgs.legacyPackages.${system};
    in
    {
      devShells.${system}.default = pkgs.mkShell {
        buildInputs = [
          pkgs.nodejs_22          # 統一されたNode.jsランタイム
          pkgs.mysql84            # サポート期間内のMySQL 8.4（クライアントツール・mysqladmin用）
          pkgs.openssl            # Prismaの動作に必須のライブラリ
          pkgs.bashInteractive    # *.sh スクリプトを安全に実行するため
        ];

        # M3 MacのNix環境でPrismaを確実に動作させるための環境変数
        shellHook = ''
          export PRISMA_QUERY_ENGINE_LIBRARY="${pkgs.prisma-engines}/lib/libquery_engine.node"
          export PRISMA_SCHEMA_ENGINE_BINARY="${pkgs.prisma-engines}/bin/schema-engine"
          export PRISMA_QUERY_ENGINE_BINARY="${pkgs.prisma-engines}/bin/query-engine"
          
          echo "========================================================"
          echo " 💡 Study Habit Management 開発環境 (Nix) が起動しました"
          echo " Node.js: $(node -v)"
          echo " MySQL CLI: $(mysql --version | awk '{print $5}')"
          echo "========================================================"
        '';
      };
    };
}
