import * as dayjs from "dayjs";

import { RESPONSE_CODE, RESPONSE_MSG } from "@/enums";
// import type { Response } from "@/typings";

/**
 * @description: 统一返回体
 */
export const responseMessage = <T = any>(
	data: T,
	msg: string = RESPONSE_MSG.SUCCESS,
	code: number = RESPONSE_CODE.SUCCESS,
): Api.Common.Response<T> => ({
	data,
	msg,
	code,
	timestamp: dayjs().valueOf(),
});
