# !/bin/sh
 echo "start Create OpenAPI"
 swagger-cli bundle OpenAPI.yaml --outfile dist/openapi-full.yaml --type yaml
 echo "end Create OpenAPI"
