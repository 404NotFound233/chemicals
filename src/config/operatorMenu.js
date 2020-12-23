const menuList = [
    {
        title: '出入园区',
        children: [
          {
            title:'发起出园',
            key: '/operator/launch_out_park'
          },
          {
            title:'入园',
            key: '/operator/in_park'
          },
          {
            title:'出园',
            key: '/operator/out_park'
          },
        ]
    },
    {
        title: '出入仓库',
        children: [
          {
            title:'原料出库',
            key: '/operator/raw_out'
          },
          {
            title:'产品入库',
            key: '/operator/product_in'
          }
        ]
    },
    {
        title: '生产销毁',
        children: [
          {
            title:'发起生产',
            key: '/operator/launch_production'
          },
          {
            title:'生产完成-产品录入',
            key: '/operator/production_batch_out'
          },
          {
            title:'发起销毁',
            key: '/operator/launch_destroy'
          },
          {
            title:'销毁',
            key: '/operator/destroy'
          }
        ]
    },
    {
        title: '园内物流',
        children: [
          {
            title:'发起物流',
            key: '/operator/launch_express'
          },
          {
            title:'取消物流',
            key: '/operator/cancel_express'
          },
          {
            title:'物流出库',
            key: '/operator/express_out'
          },
          {
            title:'物流入库',
            key: '/operator/express_in'
          }
        ]
    }
];
export default menuList;
