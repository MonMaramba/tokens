import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";

actor Token {

    var owner : Principal = Principal.fromText("gafdc-364ut-fuzim-mcvsr-px4lj-ahxtw-jvtma-r2svf-j44dt-hkau7-4ae");
    var totalSupply : Nat = 1000000000;
    var symbol : Text = "MERA";

    var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);

    balances.put(owner, totalSupply);

    public query func balanceOf(who: Principal) : async Nat {
        
        let balance : Nat = switch (balances.get(who)){
            case null 0;
            case(?result) result;
        };
        return balance;
    };

    public query func getSymbol() : async Text {
        return symbol;
    };

}