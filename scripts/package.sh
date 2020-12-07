 #!/bin/bash node
if [[ -z "${BUCKET}" ]]; then
  echo please provide BUCKET
  exit 1
fi

sam package \
  --template-file ./sam/template.yaml \
  --output-template-file ./sam/package.yaml \
  --s3-bucket ${BUCKET}
