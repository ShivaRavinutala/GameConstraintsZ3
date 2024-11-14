import { init } from 'z3-solver';

const { Context } = await init();
const { Solver, Int, And, Or, Distinct } = new Context("main");
const solver = new Solver();

const bob = Int.const('bob');
const mary = Int.const('mary');
const cathy = Int.const('cathy');
const sue = Int.const('sue');

/*
2 0
15 0
-8 0


1 2 3 4 0
-1 -2 0
-1 -3 0
-1 -4 0
-2 -3 0
-2 -4 0
-3 -4 0


5 6 7 8 0
-5 -6 0
-5 -7 0
-5 -8 0
-6 -7 0
-6 -8 0
-7 -8 0


9 10 11 12 0
-9 -10 0
-9 -11 0
-9 -12 0
-10 -11 0
-10 -12 0
-11 -12 0


13 14 15 16 0
-13 -14 0
-13 -15 0
-13 -16 0
-14 -15 0
-14 -16 0
-15 -16 0


1 5 9 13 0
-1 -5 0
-1 -9 0
-1 -13 0
-5 -9 0
-5 -13 0
-9 -13 0


2 6 10 14 0
-2 -6 0
-2 -10 0
-2 -14 0
-6 -10 0
-6 -14 0
-10 -14 0


3 7 11 15 0
-3 -7 0
-3 -11 0
-3 -15 0
-7 -11 0
-7 -15 0
-11 -15 0


4 8 12 16 0
-4 -8 0
-4 -12 0
-4 -16 0
-8 -12 0
-8 -16 0
-12 -16 0
*/

solver.add(
    // bob has a dog (1)
    bob.eq(1),

    // sue has a bird (3)
    sue.eq(3),

    // mary does not have a fish (-2)
    mary.neq(2),

    // each one is not equal to the other
    bob.neq(sue),
    bob.neq(mary),
    bob.neq(cathy),

    mary.neq(bob),
    mary.neq(sue),
    mary.neq(cathy),

    sue.neq(bob),
    sue.neq(mary),
    sue.neq(cathy),

    cathy.neq(bob),
    cathy.neq(mary),
    cathy.neq(sue),



    // maximum for bob, mary, sue, and cathy should be 4
    bob.le(4),
    mary.le(4),
    cathy.le(4),
    sue.le(4),


    //minimum is 1
    bob.ge(1),
    mary.ge(1),
    cathy.ge(1),
    sue.ge(1),
);

// Run Z3 solver, find solution and sat/unsat
console.log(await solver.check());

// Extract value for x
const model = solver.model();
const bobAnimal = model.eval(bob);
const maryAnimal = model.eval(mary);
const cathyAnimal = model.eval(cathy);
const sueAnimal = model.eval(sue);

const arrNames = ['Bob', 'Mary', 'Cathy', 'Sue'];
const arrVals = [bobAnimal, maryAnimal, cathyAnimal, sueAnimal];

// dog (1), fish (2), cat (4), bird (3)

for (var i = 0; i < arrNames.length; i++) {
    if (arrVals[i] == 1) {
        console.log(arrNames[i] + ': ' + 'Dog');
    } else if (arrVals[i] == 2) {
        console.log(arrNames[i] + ': ' + 'Fish');
    } else if (arrVals[i] == 3) {
        console.log(arrNames[i] + ': ' + 'Bird');
    } else if (arrVals[i] == 4) {
        console.log(arrNames[i] + ': ' + 'Cat');
    }
}
