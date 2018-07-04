const reasons = {   
    1000:'请求成功',
    2000:'服务器出现未知错误',
    2101:'服务器空指针异常',
    2201:'数据库插入重复',
    2202:'数据库更新重复',
    2301:'无效参数',
    3101:'更新失败',
    3102:'保存失败',
    3103:'请勿重复操作',
    3104:'Json解析失败',
    3105:'数据库查询值不唯一',
    3106: '拒绝操作',
    4101:'认证失败',
    4102:'您无此操作权限',
    4103:'用户已冻结',
    4104:'用户未激活',
    4201:'旧密码错误',
    4202:'密码错误',
    4203:'密码必须含大小写及数字',
    4301:'该用户名已经存在',
    4302:'该用户不存在',
    4303:'邮箱格式不正确',
    4304:'用户名或密码错误',
    4305:'用户名或密码为空',
    4306:'旧密码错误',
    4406:'角色不存在',
    5101:'设备不存在',
    5102:'设备已经注册',
    5103:'设备未激活',
    6101:'组名已存在',
    6102:'组名不能为空',
    6103:'默认组禁止删除',
    6104:'组名不存在',
    8100:'第三方服务连接失败',
    9101:'参数为空',
}

const reason = code => reasons[code]

export {
    reason
}