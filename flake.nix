{
  description = "Study Habit Management Project Environment (M3 Native)";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    # Node.js 22.23.4（2026-10-21 のセキュリティリリース）を含む nixpkgs の master コミット。
    # nixos-unstable に 22.23.4 以降が入ったら、この入力を消して pkgs.nodejs_22 に戻す。
    nixpkgs-nodejs.url = "github:nixos/nixpkgs/4c0aafebb03dcc7fba1c8dfb5946d1cd0daa4b05";
  };

  outputs = inputs@{ self, nixpkgs, nixpkgs-nodejs, ... }:
    let
      system = "aarch64-darwin"; # M3 Mac用
      pkgs = nixpkgs.legacyPackages.${system};
      nodejsPkgs = nixpkgs-nodejs.legacyPackages.${system};
    in
    {
      devShells.${system}.default = pkgs.mkShell {
        buildInputs = [
          nodejsPkgs.nodejs_22    # 統一されたNode.jsランタイム
          pkgs.mysql84            # サポート期間内のMySQL 8.4（クライアントツール・mysqladmin用）
          pkgs.openssl            # Prismaの動作に必須のライブラリ
	  pkgs.git                # nix環境内でもgitを使えるように
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

        if [ -z "$ZSH_VERSION" ]; then
	        exec zsh -is eval "precmd_vcs_info"
	      fi
        '';
      };
    };
}
