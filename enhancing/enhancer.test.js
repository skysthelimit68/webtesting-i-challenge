const {succeed, fail, repair, get, preventOutOfBound} = require('./enhancer.js');
// test away!

describe('enhancer.js', () => {
    
    
    describe('repair test', () => {
        it('restores durabiity to 100', ()=> {
            expect(repair({ durability: 89}).durability).toBe(100);
            expect(repair({ durability: -89}).durability).toBe(100);
            expect(repair({ durability: 100}).durability).toBe(100);
            expect(repair({ durability: 0}).durability).toBe(100);
            expect(repair({ durability: [3,5,"string",{"3":5}]}).durability).toBe(100);


        })
    })
    it.todo('durability should have a max value of 100')

    describe('succeed test', () => {
        it('increment enhancement to up to 20', () => {
            expect(succeed({enhancement : 20}).enhancement).toBe(20);
            expect(succeed({enhancement : 12}).enhancement).toBe(13);
            expect(succeed({enhancement : -1}).enhancement).toBe(1);
            expect(succeed({enhancement : 128}).enhancement).toBe(20);
            expect(succeed({enhancement : "hahaha"}).enhancement).toBe(1);

        })
    })
    it.todo('enhancement should have max value of 20')

    describe('fail test', () => {
        it('decrement enhancement down to 16 and durability down to 0', () => {
            expect(fail({enhancement: 25, durability: 186}).enhancement).toBe(19) && expect(fail({enhancement: 25, durability: 186}).durability).toBe(90);
            expect(fail({enhancement: -25, durability: -186}).enhancement).toBe(0) && expect(fail({enhancement: -25, durability: -186}).durability).toBe(0);
            expect(fail({enhancement: 17, durability: 12}).enhancement).toBe(16) && expect(fail({enhancement: 20, durability: 12}).durability).toBe(2);
            expect(fail({enhancement: 10, durability: 12}).enhancement).toBe(10) && expect(fail({enhancement: 10, durability: 12}).durability).toBe(7);
            expect(fail({enhancement: 15, durability: 7}).enhancement).toBe(15) && expect(fail({enhancement: 15, durability: 7}).durability).toBe(0);
            expect(fail({enhancement: [15, 32], durability: {"test" : 32 }}).enhancement).toBe(0) && expect(fail({enhancement: 15, durability: 7}).durability).toBe(0);

        })
    })

    describe('out of bound test', () => {
        it('return floor/ceiling/original value based on if the value is out of bound', () => {
            expect(preventOutOfBound({enhancement: 25, durability: 186}).enhancement).toBe(20) && expect(preventOutOfBound({enhancement: 25, durability: 186}).durability).toBe(100);
            expect(preventOutOfBound({enhancement: -25, durability: -186}).enhancement).toBe(0) && expect(preventOutOfBound({enhancement: 25, durability: 186}).durability).toBe(0);
            expect(preventOutOfBound({enhancement: 16, durability: 33}).enhancement).toBe(16) && expect(preventOutOfBound({enhancement: 16, durability: 33}).durability).toBe(33);
            expect(preventOutOfBound({enhancement: {'key':"value"}, durability: "string"}).enhancement).toBe(0) && expect(preventOutOfBound({enhancement: {'key':"value"}, durability: "string"}).durability).toBe(0);

        })
    })

    describe('get test', () => {
        it('return name with enhancement if enhancement is greater than 0', () => {
            expect(get({enhancement : -3, name}).name).toBe({name}.name)
            expect(get({enhancement : 12, name}).name).toBe(`[+12] ${{name}.name}`)
            expect(get({enhancement : 29, name}).name).toBe(`[+20] ${{name}.name}`)
            expect(get({enhancement : "What What", name}).name).toBe({name}.name)


        })
    })

})