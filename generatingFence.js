import { init } from 'z3-solver';

const { Context } = await init();
const { Solver, Int, And, Or, Distinct } = new Context("main");
const solver = new Solver();

const x = Int.const('x');
const y = Int.const('y');

console.log("Generate inside a fence:");

solver.add(
    x.gt(5), x.lt(10),

    y.gt(15), y.lt(25),
);

if (await solver.check() === 'sat') {
    // Retrieve and print the solution if it exists
    const model = solver.model();
    const xVal = model.eval(x);
    const yVal = model.eval(y);
    console.log(`${xVal}, ${yVal}`);
} else {
    console.log("No solution found: the constraints may be contradictory.");
}


// reset solver for next part
solver.reset();

solver.add(
    Or(And(x.eq(5), y.lt(25), y.gt(15)), And(y.eq(15), x.lt(10), x.gt(5)))
);

var possibleLocations = [];

console.log();
console.log("Generate on the fence:");

if (await solver.check() === 'sat') {
    // Retrieve and print the solution if it exists
    while (await solver.check() == 'sat') {
        const model = solver.model();
        const xVal = parseInt(model.eval(x).toString());
        const yVal = parseInt(model.eval(y).toString());
        possibleLocations.push([xVal, yVal]);
        console.log(`(${xVal}, ${yVal})`);
        if (xVal == 5) {
            solver.add(y.neq(yVal));
        }

        if (yVal == 15) {
            solver.add(x.neq(xVal));
        }
    }
} else {
    console.log("No solution found: the constraints may be contradictory.");
}




solver.reset()


solver.add(
    // y greater than 20
    y.ge(20), y.le(30),

    // x greater than 8
    x.ge(8), x.le(20),
);

possibleLocations = [];
console.log();
console.log("Generate outside the fence:");

if (await solver.check() === 'sat') {
    // Retrieve and print the solution if it exists
    while (await solver.check() == 'sat') {
        const model = solver.model();
        const xVal = parseInt(model.eval(x).toString());
        const yVal = parseInt(model.eval(y).toString());
        possibleLocations.push([xVal, yVal]);
        console.log(`(${xVal}, ${yVal})`);
        solver.add(Or(And(x.neq(xVal)), And(y.neq(yVal))));
    }
} else {
    console.log("No solution found: the constraints may be contradictory.");
}