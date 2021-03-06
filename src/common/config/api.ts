// 以下是业务服务器API地址
export const url = 'https://api.tengpaisc.com/'

// 首页相关 - Home => 首页相关的接口
export const AdsListGet = 'API.Home.AdsListGet' // 获取广告位列表

// 用户相关 - User => 用户相关的接口
export const UserLogin = 'API.User.UserLogin' // 用户登录
export const GetLoginCode = 'API.User.GetLoginCode' // 获取验证码
export const HelpContactListGet = 'API.User.HelpContactListGet' // 获取客户联系人列表
export const UserAddressListGet = 'API.User.UserAddressListGet' // 用户收货地址列表
export const UserAddressUpdate = 'API.User.UserAddressUpdate' // 新增或修改收货地址
export const UserAddressDelete = 'API.User.UserAddressDelete' // 删除收货地址
export const UserAddressSetDefault = 'API.User.UserAddressSetDefault' // 设置当前收货地址为默认的
export const UserFeedbackSubmit = 'API.User.UserFeedbackSubmit' // 用户提交建议反馈
export const GetWXOpenID = 'API.User.GetWXOpenID' // 获取微信小程序的OpenID
export const GetWxacode = 'API.User.GetWxacode' // 获取个人推广二维码
export const GetLoginUser = 'API.User.GetLoginUser' // 获取当前登录用户的信息
export const AddUserFormID = 'API.User.AddUserFormID' // 插入用户FormID
export const GetUserCommissionList = 'API.User.GetUserCommissionList' // 获取返现列表
export const UpdateUserInfo = 'API.User.UpdateUserInfo' // 更新用户信息
export const GetWXPhone = 'API.User.GetWXPhone' // 更新用户信息

// 订单相关 - Order => 订单相关的接口
export const OrderListGet = 'API.Order.OrderListGet' // 获取订单列表
export const OrderAddressSubmit = 'API.Order.OrderAddressSubmit' // 订单提交收货地址
export const OrderConfirmReceiving = 'API.Order.OrderConfirmReceiving' // 订单确认收货
export const OrderDrying = 'API.Order.OrderDrying' // 评价晒单接口
export const OrderDryingListGet = 'API.Order.OrderDryingListGet' // 获取用户晒单列表
export const LastTransactionListGet = 'API.Order.LastTransactionListGet' // 获取最新成交列表
export const OrderExchangeSubmit = 'API.Order.OrderExchangeSubmit' // 积分兑换商品提交订单
export const OrderPay = 'API.Order.OrderPay' // 订单支付接口
export const OrderDryingUpload = 'API.Order.OrderDryingUpload' // 晒单上传图片
export const OrderSummary = 'API.Order.OrderSummary' // 订单数量统计

// 产品活动相关 - Product => 商品与活动相关接口
export const ProductCategoryListGet = 'API.Product.ProductCategoryListGet' // 获取商品类目列表
export const ProductExchangeListGet = 'API.Product.ProductExchangeListGet' // 积分兑换商品列表
export const ProductPaiListGet = 'API.Product.ProductPaiListGet' // 竞拍商品列表
export const ProductGet = 'API.Product.ProductGet' // 获取商品详情
export const ActiveBillListGet = 'API.Product.ActiveBillListGet' // 获取出价记录列表
export const PastTransactionsListGet = 'API.Product.PastTransactionsListGet' // 往期成交列表
export const HomeProductListGet = 'API.Product.HomeProductListGet' // 首页获取正在竞拍与即将开拍的商品列表
export const MyActiveList = 'API.Product.MyActiveList' // 我参与的竞拍活动列表
export const NextActiveGet = 'API.Product.NextActiveGet' // 获取下一期活动
export const GetActiveByID = 'API.Product.GetActiveByID' // 根据活动ID获取活动详情
export const ProductSearchListGet = 'API.Product.ProductSearchListGet' // 根据活动ID获取活动详情

// 运营相关 - Operate => 运营相关接口
export const HelpListGet = 'API.Operate.HelpListGet' // 获取帮助列表
export const PayMoneyListGet = 'API.Operate.PayMoneyListGet' // 获取充值金额列表
export const PayMoneySubmit = 'API.Operate.PayMoneySubmit' // 充值提交接口
export const GetSystemConfig = 'API.Operate.GetSystemConfig' // 获取系统配置参数
export const GetShareTitle = 'API.Operate.GetShareTitle' // 随机获取一个分享标题
export const GetEssayByID = 'API.Operate.GetEssayByID' // 随机获取一个分享标题