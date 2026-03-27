// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Reputation {
    mapping(address => uint256) public scores;

    event Activity(address user, uint256 points);

    function addActivity(uint256 points) external {
        scores[msg.sender] += points;
        emit Activity(msg.sender, points);
    }

    function getScore(address user) external view returns (uint256) {
        return scores[user];
    }
}
