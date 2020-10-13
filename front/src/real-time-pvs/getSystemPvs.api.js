import instance from "../axios-instance";

export const getSystemParameters = async () => (await instance.get('live_log')).data;