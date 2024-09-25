import chalk from "chalk";

class ConsoleLog {
	private ci = console.info;
	private cr = console.error;
	private ch = chalk.bgBlack;
	public raw = this.ci;
	blue(...content: unknown[]) {
		this.ci(this.ch.blueBright(content));
	}
	violet(...content: unknown[]) {
		this.ci(this.ch.rgb(255, 0, 242)(content));
	}
	slate(...content: unknown[]) {
		this.ci(this.ch.rgb(179, 179, 179)(content));
	}
	red(...content: unknown[]) {
		this.cr(this.ch.rgb(255, 0, 0)(content));
	}
	error(...content: unknown[]) {
		this.cr(this.ch.red(content));
	}
	success(...content: unknown[]) {
		this.cr(this.ch.green(content));
	}
	sky(...content: unknown[]) {
		this.ci(this.ch.rgb(94, 242, 255)(content));
	}
	green(...content: unknown[]) {
		this.ci(this.ch.rgb(0, 255, 34)(content));
	}
	gray(...content: unknown[]) {
		this.ci(this.ch.rgb(122, 122, 122)(content));
	}
}
export const Log = new ConsoleLog();
