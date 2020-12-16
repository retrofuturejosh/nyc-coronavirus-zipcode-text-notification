 #!/bin/bash node
sam deploy --template-file ./sam/package.yaml \
  --stack-name corona-notification-webapp-stack \
  --capabilities CAPABILITY_IAM \
  --guided
