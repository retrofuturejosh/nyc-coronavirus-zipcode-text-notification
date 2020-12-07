 #!/bin/bash node
sam deploy --template-file ./sam/package.yaml \
  --stack-name corona-notification-stack \
  --capabilities CAPABILITY_IAM
