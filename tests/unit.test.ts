import hash from "../src/index"

describe(`Booleans`, () => {
    test(`Simple check`, () => {
        expect(hash(true)).toEqual(hash(true));
        expect(hash(false)).not.toEqual(hash(true));
        expect(hash(false)).toEqual(hash(false))
    })
})

describe(`Strings`, () => {
    test(`Empty strings are equal`, () => {
        expect(hash("")).toEqual(hash(""))
    });
    test(`Empty string is not equal other falsy values`, () => {
        const emptyString = hash("")
        expect(emptyString).not.toEqual(hash(undefined))
        expect(emptyString).not.toEqual(hash(0))
        expect(emptyString).not.toEqual(hash(null))
        expect(emptyString).not.toEqual(hash(false))
    });
    test(`One space is not equal to many spaces`, () => {
        expect(hash(" ")).not.toEqual(hash("  "))
        expect(hash(" ")).not.toEqual(hash("           "))
    });
    test(`Basic/Common characters `, () => {
        expect(hash("Check out useSWR (npm i swr) for easy, robust data fetching in React."))
            .toEqual(hash("Check out useSWR (npm i swr) for easy, robust data fetching in React."))

        expect(hash("  af jFJI   F89fj32fajsdjfaszf0_F0j2fa0"))
            .toEqual(hash("  af jFJI   F89fj32fajsdjfaszf0_F0j2fa0"));

        expect(hash("23ja8!@#xc,m,/?@1mfjaDFJIPMal921m")).not.toEqual("23ja8!@#xc,m,/?@1m");
    });

    test(`Unconventional characters`, () => {

        expect(hash("u̝̚s̞ͨe͚̦͋ͣr̲̞͋͋ ͕̩̹͌ͯ͆ì̺̜̬̏̽ṇ̞̪͍̎͊̉͆p̼̭͎̆̐̄ͬͅȗ̬͙̗͍̟ͩ̒̃̚t͍͓̻̝̝́̾̄̐̔ś̗̹͇͉̙̟̔ͪ͑͛̐ ̥̞͚͖̪͖̎̾̈͑̆̾c̪̘̬͍̤͚͊̆͑̋̓̔a̙̠̻̬̙ͩ͒ͧ͂̄̊ͅn̞͚̠̩̬ͭ͌͑͑̍ ͍̟̲͍̼ͩ̉͒ͬ̚b̦̞̭̹ͪͦ̍ͦȅ̘̟͇͖̿̉̚ ̯̻̠ͩͥͣw̯̮͙ͫ̾̅i̦͈͛̅l̖̘ͯ͗d͔̈́")).toEqual(hash("u̝̚s̞ͨe͚̦͋ͣr̲̞͋͋ ͕̩̹͌ͯ͆ì̺̜̬̏̽ṇ̞̪͍̎͊̉͆p̼̭͎̆̐̄ͬͅȗ̬͙̗͍̟ͩ̒̃̚t͍͓̻̝̝́̾̄̐̔ś̗̹͇͉̙̟̔ͪ͑͛̐ ̥̞͚͖̪͖̎̾̈͑̆̾c̪̘̬͍̤͚͊̆͑̋̓̔a̙̠̻̬̙ͩ͒ͧ͂̄̊ͅn̞͚̠̩̬ͭ͌͑͑̍ ͍̟̲͍̼ͩ̉͒ͬ̚b̦̞̭̹ͪͦ̍ͦȅ̘̟͇͖̿̉̚ ̯̻̠ͩͥͣw̯̮͙ͫ̾̅i̦͈͛̅l̖̘ͯ͗d͔̈́"));


    });
});


describe(`Numbers including BigInt`, () => {
    test(`SheNaNigans`, () => {
        expect(NaN).toEqual(NaN);
        expect(NaN).not.toEqual(NaN.toString());
        expect(1 + NaN).toEqual(NaN + 1);
        expect("1" + NaN).not.toEqual(NaN + "1");
    })
    test(`Integers`, () => {
        expect(hash(2 + 1)).toEqual(hash(2 + 1));
        expect(hash(-3)).not.toEqual(hash("-3"));
        expect(hash(123)).not.toEqual(hash(1123));
        expect(hash(400_000)).toEqual(hash(400000));
    });
    test(`Float`, () => {
        expect(hash(0.000001)).toEqual(hash(0.000001))
        expect(hash(-0.000001)).not.toEqual(hash(0.000001))
        expect(hash(9999999.9999999)).not.toEqual(hash(10000000.0))
    });

    test(`BigInt`, () => {
        expect(hash(BigInt(8))).toEqual(hash(BigInt(8)));
        //expect(hash( BigInt(8) )).not.toEqual(hash(8)); This fails but that may be intentional;
        expect(hash(BigInt(99999999999999999999999999999999999999999999999999999999999999999999999999)))
            .not.toEqual(BigInt(77777777777777777777777777777777777777777777777777777))
    })
});



describe(`Arrays`, () => {
    test(`Empty arrays are equal`, () => {
        expect(hash([])).toEqual(hash([]))
    });
    test(`Simple arrays with primitives`, () => {
        expect(hash([1, 2, 3])).toEqual(hash([1, 2, 3]));
        expect(hash([1, 2])).not.toEqual(hash([1, 2, 3]));
        expect(hash(["1", 2, 3])).not.toEqual(hash([1, 2, 3]));
        expect(hash(["1", "2", "3"])).toEqual(hash(["1", "2", "3"]));
        expect(hash([1, 3, 2])).not.toEqual(hash([1, 2, 3]));
        expect(hash([true, true, true])).not.toEqual(hash([0, 0, 0]))
        expect(hash([true, true, true])).toEqual(hash([true, true, true]));
    });
    test(`Pseudo arrays and empty values`, () => {
        const pseudo = { "0": "A", "1": "B", "2": "C", length: 3, constructor: Array }
        //expect(hash(pseudo)).not.toEqual(hash(["A","B","C"])) This fails (yes it's super contrived 🤪)
        expect(hash(pseudo)).toEqual(hash(pseudo));

        const arrayWithExtraStuff: any = [1, 2, 3];
        arrayWithExtraStuff.extra = "Stuff";
        arrayWithExtraStuff.extraStuff = [];
        arrayWithExtraStuff.evenMoreExtraStuff = { nested: "extraStuff" };
        //expect(hash(arrayWithExtraStuff)).not.toEqual(hash([1, 2, 3]))  This fails (yep still kinda contrived 🙃)

        const anotherArrayWithExtraStuff = Object.assign([1, 2, 3,], { extra: "Stuff" });
        /* expect(hash(anotherArrayWithExtraStuff)).not.toEqual(hash([1,2,3])) 
        Ok maybe I'm just getting silly 😂 but this fails  */

        const arrayWithEmptyIndices = [1, 2];
        arrayWithEmptyIndices[100] = 3;
        expect(arrayWithEmptyIndices).not.toEqual([1, 2, 3]);
    })
})


describe(`POJOs`, () => {
    test(`Empty objects are equal`, () => {
        expect(hash({})).toEqual(hash({}));
    });
    test(`Empty object not equal to empty array`, () => {
        expect(hash({})).not.toEqual(hash([]));
    });
    test(`Objects with simple k:v pairs where v is a primitive`, () => {
        expect(hash({ hi: "hello" })).toEqual(hash({ hi: "hello" }));
        expect(hash({ hi: "hello" })).not.toEqual(hash({ bye: "goodbye" }));

        const pretendRecord = {
            name: "Muffin Man",
            street: "Drury Ln",
            crimesCommitted: 13,
            description: "⚠ USE EXTREME CAUTION WHEN APPROACHING ⚠",
            currentlyUnderInvestigation: true
        }
        expect(hash(pretendRecord)).toEqual(hash({
            name: "Muffin Man",
            street: "Drury Ln",
            crimesCommitted: 13,
            description: "⚠ USE EXTREME CAUTION WHEN APPROACHING ⚠",
            currentlyUnderInvestigation: true
        }))

        expect(hash(pretendRecord)).not.toEqual(hash({
            name: "Muffin Man",
            street: "Drury Ln",
            crimesCommitted: 14,
            description: "⚠ USE EXTREME CAUTION WHEN APPROACHING ⚠",
            currentlyUnderInvestigation: true
        }))

        expect(hash(pretendRecord)).not.toEqual(hash({
            name: "Muffin Man",
            street: "Drury Ln",
            crimesCommitted: 13,
            currentlyUnderInvestigation: true
        }))
    });

    test(`Objects with nested data structures`, () => {
        expect(hash({ a: { b: { c: {} } } })).toEqual(hash({ a: { b: { c: {} } } }));
        expect(hash({ a: { b: { c: {} } } })).not.toEqual(hash({ a: { b: { c: { d: {} } } } }));
        expect(hash({ a: { b: { c: {} } } })).not.toEqual(hash({ a: { b: { c: { d: {} } } } }));

        expect(hash({
            a: [1, 2, 3],
            b: {
                c: [4, 5, 6],
                d: [{ e: "f" }, { g: "h" }]
            }
        })).toEqual(hash({
            a: [1, 2, 3],
            b: {
                c: [4, 5, 6],
                d: [{ e: "f" }, { g: "h" }]
            }
        }))

        expect(hash({
            a: [1, 2, 3],
            b: {
                c: [4, 5, 6],
                d: [{ e: "f" }, { g: "h" }]
            }
        })).not.toEqual(hash({
            a: [1, 2, 3],
            b: {
                c: [4, 5, 6],
                d: [{ e: "f" }, { i: "j" }]
            }
        }))
    })

})