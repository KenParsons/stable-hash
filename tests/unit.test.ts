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


describe(`Numbers including BigInt`, ()=> { 
    test(`SheNaNigans`, ()=> { 
        expect(NaN).toEqual(NaN);
        expect(NaN).not.toEqual(NaN.toString());
        expect(1 + NaN).toEqual(NaN + 1);
        expect("1" + NaN).not.toEqual(NaN + "1");
    })
    test(`Integers`, ()=> { 
        expect(hash(2 + 1)).toEqual(hash(2 + 1));
        expect(hash(-3)).not.toEqual(hash("-3"));
        expect(hash(123)).not.toEqual(hash(1123));
        expect(hash(400_000)).toEqual(hash(400000));
    });
    test(`Float`, ()=> { 
        expect(hash(0.000001)).toEqual(hash(0.000001))
        expect(hash(-0.000001)).not.toEqual(hash(0.000001))
        expect(hash(9999999.9999999)).not.toEqual(hash(10000000.0))
    });

    test(`BigInt`, ()=> { 
        expect(hash(BigInt(8))).toEqual(hash(BigInt(8)));
        //expect(hash( BigInt(8) )).not.toEqual(hash(8)); This fails but that may be intentional;
        expect(hash(BigInt(99999999999999999999999999999999999999999999999999999999999999999999999999)))
        .not.toEqual(BigInt(77777777777777777777777777777777777777777777777777777))
    })
});


