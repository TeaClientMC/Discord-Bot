{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-parts.url = "github:hercules-ci/flake-parts";
		agenix-shell.url = "github:aciceri/agenix-shell";
  };

  outputs = inputs:
    inputs.flake-parts.lib.mkFlake {inherit inputs;} {
			imports = [
    		inputs.agenix-shell.flakeModules.default
  		];

			agenix-shell.secrets = {	
				Token.file = ./secrets/devToken.age;
				AppID.file = ./secrets/devAppID.age;
			};

      systems = inputs.nixpkgs.lib.systems.flakeExposed;
      perSystem = {
        pkgs,
        config,
        lib,
        ...
      }: 
      {
        devShells.default = pkgs.mkShell
        {
          packages = with pkgs; [
            bun
						typescript
						nodePackages.typescript-language-server
          ];

					# Agenix-shell
					shellHook = ''
						source ${lib.getExe config.agenix-shell.installationScript}
					'';
        };
      };
    };
}
