# echo "🔑 API Authenticaton ..."
# echo "Please provide your accessToken"
# export API_TOKEN=$accessToken

echo ""
echo ""
echo "🛠️  Generating typings from graphql-codegen ..."

yarn graphql-codegen --config ./apps/react-app/codegen.ts

echo ""
echo ""
echo "🌟 Formatting generated types ..."

yarn eslint \
  --fix \
 'apps/react-app/src/**/*.generated.ts'

yarn prettier \
  --write \
  --log-level silent \
  'apps/react-app/src/**/*.generated.ts' \
  'apps/react-app/src/types/gql-global-types.ts'

echo ""
echo ""
echo "✅ All done!"