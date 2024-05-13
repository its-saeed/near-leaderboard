use near_sdk::json_types::U128;
use near_sdk::store::LookupMap;
use near_sdk::{near, AccountId};

#[near(serializers = [borsh, json])]
pub struct PostedMessage {
    pub premium: bool,
    pub sender: AccountId,
    pub text: String,
}

#[near(contract_state)]
pub struct LeaderBoard {
    scores: LookupMap<AccountId, U128>,
}

impl Default for LeaderBoard {
    fn default() -> Self {
        Self {
            scores: LookupMap::new(b"m"),
        }
    }
}

#[near]
impl LeaderBoard {
    pub fn add_score(&mut self, account_id: AccountId, score: u128) {
        let new_score = self.scores.entry(account_id.clone()).or_default().0 + score;
        self.scores.insert(account_id, U128(new_score));
    }

    pub fn get_score(&self, account_id: AccountId) -> Option<u128> {
        self.scores.get(&account_id).map(|score| score.0)
    }
}

#[cfg(test)]
mod tests {
    use std::str::FromStr;

    use super::*;

    #[test]
    fn add_score() {
        let mut leader_board = LeaderBoard::default();
        let account = AccountId::from_str("alice.testnet").unwrap();
        leader_board.add_score(account.clone(), 10);

        let score = leader_board.get_score(account);
        assert_eq!(score, Some(10));
    }

    #[test]
    fn get_score_of_absent_account() {
        let leader_board = LeaderBoard::default();
        let account = AccountId::from_str("alice.testnet").unwrap();

        let score = leader_board.get_score(account);
        assert_eq!(score, None);
    }
}
