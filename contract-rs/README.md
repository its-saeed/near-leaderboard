## How to Build Locally?

Install [`cargo-near`](https://github.com/near/cargo-near) and run:

```bash
cargo near build
```

## How to Test Locally?

```bash
cargo test
```

## How to Deploy?

Deployment is automated with GitHub Actions CI/CD pipeline. To deploy manually,
install [`cargo-near`](https://github.com/near/cargo-near) and run:

```bash
cargo near deploy <account-id>
```

## How to Interact?

_In this example we will be using [NEAR CLI](https://github.com/near/near-cli)
to intract with the NEAR blockchain and the smart contract_

_If you want full control over of your interactions we recommend using the
[near-cli-rs](https://near.cli.rs)._

### Get the Counter

`get_num` is a read-only method (aka `view` method).

`View` methods can be called for **free** by anyone, even people **without a
NEAR account**!

```bash
# Use near-cli to get the counter value
near view <contract-account-id> get_num
```
