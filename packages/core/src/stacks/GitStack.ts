import { Tags } from 'aws-cdk-lib/core'
import { StackContext } from 'sst/constructs'

export function Git({ app }: StackContext) {
  Tags.of(app).add('stage', app.stage)
  Tags.of(app).add('service', `${app.name}`)
  Tags.of(app).add('domain', 'appsupport')
  Tags.of(app).add('git-repo', 'loanpal-engineering/appsupp-tools')
}
