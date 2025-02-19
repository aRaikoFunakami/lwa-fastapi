import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as python from "@aws-cdk/aws-lambda-python-alpha";

export class Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambdaAdapterLayerArn = `arn:aws:lambda:${this.region}:753240598075:layer:LambdaAdapterLayerArm64:24`;

    const layer = new python.PythonLayerVersion(this, "Layer", {
      entry: "src/layer",
      compatibleRuntimes: [lambda.Runtime.PYTHON_3_13],
      compatibleArchitectures: [lambda.Architecture.ARM_64],
    });

    const func = new lambda.Function(this, "Func", {
      runtime: lambda.Runtime.PYTHON_3_13,
      handler: "run.sh",
      code: lambda.Code.fromAsset("src/app"),
      architecture: lambda.Architecture.ARM_64,
      timeout: cdk.Duration.seconds(30),
      layers: [
        layer,
        lambda.LayerVersion.fromLayerVersionArn(
          this,
          "LambdaAdapterLayerArm64",
          lambdaAdapterLayerArn,
        ),
      ],
      environment: {
        PYTHONPATH: "/opt/python",
        PORT: "8000",
        AWS_LAMBDA_EXEC_WRAPPER: "/opt/bootstrap",
      },
      loggingFormat: lambda.LoggingFormat.JSON,
    });

    const functionUrl = func.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    });

    new cdk.CfnOutput(this, "FunctionUrl", {
      value: functionUrl.url,
    });
  }
}
