# FastAPI Lambda Web Adapter Sample

このリポジトリは、AWS Lambda 上で FastAPI を使用するためのサンプルプロジェクトです。AWS CDK を使用して、Lambda 関数とその依存関係をデプロイします。

## 構成

- **FastAPI**: Python で書かれた Web フレームワーク。
- **AWS Lambda**: サーバーレスコンピューティングサービス。
- **AWS CDK**: インフラストラクチャをコードとして管理するためのツール。

## 必要な環境

- Node.js (バージョン 20.x)
- Python (バージョン 3.13.x)

## セットアップ

1. リポジトリをクローンします。

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. 依存関係をインストールします。

   ```bash
   npm install
   ```

   ```bash
   pip install -r src/layer/requirements.txt
   ```

## コマンド

以下のコマンドを使用してプロジェクトをデプロイできます。

- `npx cdk deploy`: スタックをデフォルトの AWS アカウント/リージョンにデプロイします。
- `npx cdk diff`: デプロイされたスタックと現在の状態を比較します。
- `npx cdk synth`: 合成された CloudFormation テンプレートを出力します。
