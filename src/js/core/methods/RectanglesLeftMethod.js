"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RectanglesLeftMethod = void 0;
const Method_1 = require("./Method");
const MethodResult_1 = require("../results/MethodResult");
const method_config_1 = __importDefault(require("./method.config"));
class RectanglesLeftMethod extends Method_1.Method {
    calculate(input, fc) {
        let n = Method_1.Method.initialN / 2;
        let valueN = null;
        let valueNPrev = null;
        const accuracy = input.getAccuracy();
        const a = input.getA();
        const b = input.getB();
        let h;
        const startTime = Date.now();
        do {
            n *= 2;
            valueNPrev = valueN;
            valueN = 0;
            h = (b - a) / n;
            for (let x = a; x <= b - h; x += h) {
                valueN += fc.calc(x);
            }
            valueN *= h;
            if (Date.now() - startTime >= method_config_1.default.maxTimeout) {
                throw Error("Превышено максимальное время вычисления. Желаемая точность не достигнута." +
                    "\nПоследние полученные значения:" +
                    `\n  значение интеграла:   ${valueN}` +
                    `\n  количество разбиений: ${n}`);
            }
        } while (!this.isAccuracyProficient(valueN, valueNPrev, accuracy));
        console.log("reduLT");
        // clearTimeout(timerId);
        return new MethodResult_1.MethodResult(valueN, n);
    }
}
exports.RectanglesLeftMethod = RectanglesLeftMethod;
//# sourceMappingURL=RectanglesLeftMethod.js.map