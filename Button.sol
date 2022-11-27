//"SPDX-License-Identifier: UNLICENSED"
pragma solidity >= 0.7.0 < 0.9.0;

contract Button {
    event CatPhotoPurchased(string _value);

    string catApi = "https://api.thecatapi.com/v1/images/search";
    uint public count = 0;

    constructor() {

    }

    function pushButton() public {
        count = count + 1;
    }

    function getCount() public view returns(uint) {
        return count;
    }

    function spend() public {
      require(count >= 5, "Not enough points");
      count = count - 5;
      emit CatPhotoPurchased(catApi);
    }

    function destroy(address apocalypse) public {
      selfdestruct(payable(apocalypse));
    }
}