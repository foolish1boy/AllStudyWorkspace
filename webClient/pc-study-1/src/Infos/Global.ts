
import store from '@/store'
const inputMaxLenght = 200;
const rateList = [
      {
        label:"1:10",
        value:10
      },
      {
        label:"1:9",
        value:9
      },
      {
        label:"1:8",
        value:8
      },
      {
        label:"1:7",
        value:7
      },
      {
        label:"1:6",
        value:6
      },
      {
        label:"1:5",
        value:5
      }];
const bankList = [
  {
    label:"中国银行",
    value:"1"
  },
  {
    label:"中国工商银行",
    value:"2"
  },
  {
    label:"中国农业银行",
    value:"3"
  },
  {
    label:"中国建设银行",
    value:"4"
  },
  {
    label:"中国交通银行",
    value:"5"
  }
]

const landingStyleList = [
  {
    label:"全部风格",
    value:""
  },
  {
    label:"普通Q版",
    value:"101"
  },{
    label:"普通写实",
    value:"102"
  },{
    label:"真金Q版",
    value:"103"
  },{
    label:"真金写实",
    value:"104"
  }
]


const iconStyleList = [
  {
    label:"全部风格",
    value:""
  },
  {
    label:"捕鱼",
    value:"301"
  },{
    label:"美女",
    value:"302"
  },{
    label:"牛牛",
    value:"303"
  },{
    label:"棋牌",
    value:"305"
  },{
    label:"其他",
    value:"304"
  }
]

const bgStyleList = [
  {
    label:"全部风格",
    value:""
  },
  {
    label:"类型一",
    value:"201"
  },{
    label:"类型二",
    value:"202"
  },{
    label:"类型三",
    value:"203"
  },{
    label:"类型四",
    value:"204"
  }
]


const withdrawErrorBug = {"INVALID_PARAMETER":{"Info":"参数有误。","Solution":"请检查入参：必填参数是否为空，长度超出规定限制长度 或 是否不符合格式。"},"SYSTEM_ERROR":{"Info":"系统繁忙","Solution":"可能发生了网络或者系统异常，导致无法判定准确的转账结果。此时，商户不能直接当做转账成功或者失败处理，可以考虑采用相同的out_biz_no重发请求，或者通过调用“(alipay.fund.trans.order.query)”来查询该笔转账订单的最终状态。"},"PERMIT_CHECK_PERM_LIMITED":{"Info":"根据监管部门的要求，请补全您的身份信息解除限制","Solution":"根据监管部门的要求，请补全您的身份信息解除限制"},"PAYCARD_UNABLE_PAYMENT":{"Info":"付款账户余额支付功能不可用","Solution":"请登录支付宝站内或手机客户端开启付款账户余额支付功能。"},"PAYEE_NOT_EXIST":{"Info":"收款账号不存在","Solution":"请检查收款账号类型是否匹配，传入正确的收款账号和收款姓名"},"PAYER_DATA_INCOMPLETE":{"Info":"根据监管部门的要求，需要付款用户补充身份信息才能继续操作","Solution":"请付款方登录支付宝站内或手机客户端补充身份信息"},"PERM_AML_NOT_REALNAME_REV":{"Info":"根据监管部门的要求，需要收款用户补充身份信息才能继续操作","Solution":"请联系收款方登录支付宝站内或手机客户端补充身份信息"},"PAYER_STATUS_ERROR":{"Info":"付款账号状态异常 或 付款方用户状态不正常","Solution":"请检查付款方是否进行了自助挂失，如果无，请联系支付宝客服检查付款用户状态是否正常。"},"PAYEE_USER_INFO_ERROR":{"Info":"支付宝账号和姓名不匹配，请确认姓名是否正确","Solution":"请联系收款方确认收款用户姓名正确性。"},"PAYER_USER_INFO_ERROR":{"Info":"付款用户姓名或其它信息不一致","Solution":"请检查接口传递的付款方用户姓名正确性。"},"PAYER_BALANCE_NOT_ENOUGH":{"Info":"付款方余额不足","Solution":"支付时间点付款方余额不足，请保持付款账户余额充足。"},"PAYMENT_INFO_INCONSISTENCY":{"Info":"两次请求商户单号一样，但是参数不一致","Solution":"如果想重试前一次的请求，请用原参数重试，如果重新发送，请更换单号。"},"CERT_MISS_TRANS_LIMIT":{"Info":"您的付款金额已达单笔1万元或月累计5万元，根据监管部门的要求，需要付款用户补充身份信息才能继续操作","Solution":"您的付款金额已达单笔1万元或月累计5万元，根据监管部门的要求，需要付款用户登录支付宝站内或手机客户端补充身份信息才能继续操作。"},"CERT_MISS_ACC_LIMIT":{"Info":"您连续10天余额账户的资金都超过5000元，根据监管部门的要求，需要付款用户补充身份信息才能继续操作","Solution":"您连续10天余额账户的资金都超过5000元，根据监管部门的要求，需要付款用户登录支付宝站内或手机客户端补充身份信息才能继续操作。"},"PAYEE_ACC_OCUPIED":{"Info":"该手机号对应多个支付宝账户，请传入收款方姓名确定正确的收款账号","Solution":"请传入正确的收款方姓名和与之匹配的收款账号"},"MEMO_REQUIRED_IN_TRANSFER_ERROR":{"Info":"根据监管部门的要求，单笔转账金额达到50000元时，需要填写付款理由","Solution":"请检查付款理由是否为空"},"PERMIT_NON_BANK_LIMIT_PAYEE":{"Info":"根据监管部门的要求，对方未完善身份信息或未开立余额账户，无法收款","Solution":"请联系收款方登录支付宝站内或手机客户端完善身份信息后，重试。"},"PERMIT_PAYER_LOWEST_FORBIDDEN":{"Info":"根据监管部门要求，付款方身份信息完整程度较低，余额支付额度受限","Solution":"请付款方登录支付宝站内或手机客户端检查自己的支付额度，建议付款方尽快登录支付宝站内善身份信息提升额度。"},"PERMIT_PAYER_FORBIDDEN":{"Info":"根据监管部门要求，付款方余额支付额度受限","Solution":"请付款方登录支付宝站内或手机客户端检查自己的支付额度。"},"PERMIT_CHECK_PERM_IDENTITY_THEFT":{"Info":"您的账户存在身份冒用风险，请进行身份核实解除限制","Solution":"您的账户存在身份冒用风险，请进行身份核实解除限制"},"REMARK_HAS_SENSITIVE_WORD":{"Info":"转账备注包含敏感词，请修改备注文案后重试","Solution":"转账备注包含敏感词，请修改备注文案后重试"},"ACCOUNT_NOT_EXIST":{"Info":"根据监管部门的要求，请补全你的身份信息，开立余额账户","Solution":"请付款方登录支付宝站内或手机客户端补全身份信息。"},"PAYER_CERT_EXPIRED":{"Info":"根据监管部门的要求，需要付款用户更新身份信息才能继续操作","Solution":"根据监管部门的要求，需要付款用户登录支付宝站内或手机客户端更新身份信息才能继续操作。"},"EXCEED_LIMIT_PERSONAL_SM_AMOUNT":{"Info":"转账给个人支付宝账户单笔最多5万元","Solution":"转账给个人支付宝账户单笔最多5万元。"},"EXCEED_LIMIT_ENT_SM_AMOUNT":{"Info":"转账给企业支付宝账户单笔最多10万元","Solution":"转账给企业支付宝账户单笔最多10万元。"},"EXCEED_LIMIT_SM_MIN_AMOUNT":{"Info":"单笔最低转账金额0.1元","Solution":"请修改转账金额。"},"EXCEED_LIMIT_DM_MAX_AMOUNT":{"Info":"单日最多可转100万元","Solution":"单日最多可转100万元。"},"EXCEED_LIMIT_UNRN_DM_AMOUNT":{"Info":"收款账户未实名，单日最多可收款1000元","Solution":"收款账户未实名，单日最多可收款1000元。"},"PAYER_PAYEE_CANNOT_SAME":{"Info":"收付款方不能相同","Solution":"请检查一下收款方信息填写是否为付款方本人"},"SYNC_SECURITY_CHECK_FAILED":{"Info":"当前操作存在风险，请停止操作，如有疑问请咨询客服","Solution":"当前操作存在风险，请停止操作，如有疑问请咨询客服"},"TRANSFER_ERROR":{"Info":"转账失败","Solution":"转账失败，请调用查询接口确认具体的失败原因。"}}
      
function checkPermission(mode:number|string):boolean {
  if (mode) 
  {
    mode = mode.toString()
    const roles = store.getters && store.getters.roles;
    for (let i in roles){
      let perArr = roles[i]["Permission"].split(",")
      if(perArr.indexOf(mode) > -1){
        return true
      }
    }
    return false
  } else {
    return true
  }
}

function getBeforeDateStr(days:number=0){
  days = days == 0 ? 0 : days-1;
  let myDate:Date = new Date();
  let beforeDate = new Date(myDate.getTime() - days * 24 * 3600 * 1000);
  let preDate = beforeDate.getFullYear() + "-" + appendZero(beforeDate.getMonth() + 1) + "-" + appendZero(beforeDate.getDate());
  return preDate;
}

    

function getBeforeDateTimestamp(days:number,onlyDay = true):string{
  days = days - 1 || 0;
  //onlyDay = onlyDay || true;
    let myDate = new Date().toDateString();
    let d = new Date(myDate);
    let currentDay = d.getDate();
  d.setDate(currentDay - days);
  let beforeDate:number = 0
  if(!onlyDay){
    beforeDate = d.getTime()+86399999;
  }else{
    beforeDate = d.getTime();
  }
      
    return beforeDate.toString();
}


function appendZero(obj:number) {
  if (obj < 10) {
      return "0" + obj;
  } else {
      return obj;
  }
}
//获取前某个月的时间戳
function getBeforeOneMonth(months:number){
  //months = months | 1;
  let d = new Date()
  d.setDate(1)
  d.setHours(0)
  d.setMinutes(0)
  d.setSeconds(0)
  d.setMilliseconds(0)
  let currentMonth = d.getMonth();
  d.setMonth(currentMonth - months);
  let beforeMonthTime = d.getTime();
  return beforeMonthTime;
}

export default {
  inputMaxLenght,
  rateList,
  bankList,
  landingStyleList,
  checkPermission,
  getBeforeDateStr,
  getBeforeDateTimestamp,
  getBeforeOneMonth,
  withdrawErrorBug
}
