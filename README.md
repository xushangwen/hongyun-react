# 红运官网

React 官网 + Strapi CMS + Nitro BFF。中文内容已经迁入 CMS；英文接口和 `en` locale 已预留，但翻译验收前不发布英文内容，也不会自动回退中文。

## 本地启动

要求 Node.js 20–26、pnpm 9.15.9。

```bash
pnpm install
node scripts/setup-local-env.mjs
pnpm cms:build
pnpm cms:start
pnpm api:build
pnpm api:start
pnpm dev
```

- 官网：http://127.0.0.1:5173
- CMS：http://127.0.0.1:1337/admin
- BFF 健康检查：http://127.0.0.1:3001/api/health
- 管理员邮箱：`admin@hongyun.local`
- 本地管理员密码：`apps/cms/.env` 中的 `CMS_ADMIN_PASSWORD`

CMS 与 BFF 的 `.env` 均不入库。前端不能直接访问 Strapi，Strapi Public Role 默认无内容读取和表单写入权限。

## 内容同步与验证

```bash
pnpm cms:seed
pnpm cms:verify
pnpm cms:verify:live
pnpm check
pnpm api:build
pnpm cms:build
```

普通种子命令只补齐缺失内容，不覆盖后台编辑。仅在确认重置迁移数据且已备份时运行 `pnpm cms:seed:force`。

迁移脚本按 `legacyKey` 幂等同步，重复执行不会生成重复内容。英文记录暂不创建。

## 简历与个人信息

简历只进入 `apps/api/.private-uploads`，文件签名、MIME、扩展名和大小均校验；敏感字段加密存储。生产环境需安装 ClamAV，并定时执行：

```bash
pnpm --filter @hongyun/cms resume:scan
pnpm --filter @hongyun/cms retention:cleanup
```

招聘人员先用 `NITRO_RECRUITER_TOKEN` 调用签名接口，再通过 5 分钟有效的单次下载地址读取已通过扫描的文件。所有签名和下载动作写入访问审计。

## 备份

```bash
./scripts/ops/backup-cms.sh /absolute/backup/root
./scripts/ops/verify-backup.sh /absolute/backup/root/hongyun-cms-YYYYMMDD-HHMMSS
```

生产部署示例见 `ecosystem.config.cjs` 和 `docs/nginx-hongyun.conf.example`。上线前必须替换正式域名、MySQL/对象存储/SMTP 配置、密钥，并为 `/admin` 配置 VPN、IP 白名单或额外认证。

完整结果与运营说明见 `docs/CMS实施完成报告.md`。
