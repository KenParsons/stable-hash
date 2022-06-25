import hash from "../src/index"

describe(`Strings`, ()=> { 
    test(`Empty strings are equal`, ()=> { 
        expect(hash("")).toEqual(hash(""))
    });
    test(`Empty string is not equal other falsy values`, ()=> { 
        const emptyString = hash("")
        expect(emptyString).not.toEqual(hash(undefined))
        expect(emptyString).not.toEqual(hash(0))
        expect(emptyString).not.toEqual(hash(null))
        expect(emptyString).not.toEqual(hash(false))
    });
    test(`One space is not equal to many spaces`, ()=>  { 
        expect(hash(" ")).not.toEqual(hash("  "))
        expect(hash(" ")).not.toEqual(hash("           "))
    });
    test(`Basic/Common characters `, ()=> { 
          expect(hash("Check out useSWR (npm i swr) for easy, robust data fetching in React."))
        .toEqual(hash("Check out useSWR (npm i swr) for easy, robust data fetching in React."))

          expect(hash("  af jFJI   F89fj32fajsdjfaszf0_F0j2fa0"))
        .toEqual(hash("  af jFJI   F89fj32fajsdjfaszf0_F0j2fa0"));

        expect(hash("23ja8!@#xc,m,/?@1mfjaDFJIPMal921m")).not.toEqual("23ja8!@#xc,m,/?@1m");
    });

    test(`Unconventional characters`, ()=> { 

        expect(hash("u̝̚s̞ͨe͚̦͋ͣr̲̞͋͋ ͕̩̹͌ͯ͆ì̺̜̬̏̽ṇ̞̪͍̎͊̉͆p̼̭͎̆̐̄ͬͅȗ̬͙̗͍̟ͩ̒̃̚t͍͓̻̝̝́̾̄̐̔ś̗̹͇͉̙̟̔ͪ͑͛̐ ̥̞͚͖̪͖̎̾̈͑̆̾c̪̘̬͍̤͚͊̆͑̋̓̔a̙̠̻̬̙ͩ͒ͧ͂̄̊ͅn̞͚̠̩̬ͭ͌͑͑̍ ͍̟̲͍̼ͩ̉͒ͬ̚b̦̞̭̹ͪͦ̍ͦȅ̘̟͇͖̿̉̚ ̯̻̠ͩͥͣw̯̮͙ͫ̾̅i̦͈͛̅l̖̘ͯ͗d͔̈́")).toEqual(hash("u̝̚s̞ͨe͚̦͋ͣr̲̞͋͋ ͕̩̹͌ͯ͆ì̺̜̬̏̽ṇ̞̪͍̎͊̉͆p̼̭͎̆̐̄ͬͅȗ̬͙̗͍̟ͩ̒̃̚t͍͓̻̝̝́̾̄̐̔ś̗̹͇͉̙̟̔ͪ͑͛̐ ̥̞͚͖̪͖̎̾̈͑̆̾c̪̘̬͍̤͚͊̆͑̋̓̔a̙̠̻̬̙ͩ͒ͧ͂̄̊ͅn̞͚̠̩̬ͭ͌͑͑̍ ͍̟̲͍̼ͩ̉͒ͬ̚b̦̞̭̹ͪͦ̍ͦȅ̘̟͇͖̿̉̚ ̯̻̠ͩͥͣw̯̮͙ͫ̾̅i̦͈͛̅l̖̘ͯ͗d͔̈́"));


    });
});


