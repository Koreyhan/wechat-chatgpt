import axios from 'axios';

const checkEnv = async () => {
  try {
    const { data } = await axios.get('https://chat.openai.com/cdn-cgi/trace')
    const dataArr = data.split("\n");
    const fields: Record<string, string> = {};
    dataArr.forEach((item: string) => {
      const field = item.split("=");
      fields[field[0]] = field[1];
    });
    console.log(`当前服务使用环境 ${fields.loc}`)
    if (fields.loc === 'CN') {
      return Promise.reject('当前服务使用环境为 CN，存在账号封禁风险')
    }
  } catch (err) {
    console.error(err);
  }
};

export default checkEnv;