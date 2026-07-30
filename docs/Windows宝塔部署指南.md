# 红运官网 Windows 宝塔部署指南

## 生产结构

- IIS 托管 `dist` 静态前端。
- Nitro BFF 仅监听 `127.0.0.1:3001`。
- Strapi 仅监听 `127.0.0.1:1337`，通过独立 CMS 域名反代。
- MySQL 8 仅监听本机，应用使用独立低权限数据库账号。
- 宝塔 Node 项目管理器分别守护 Nitro 与 Strapi，均设为开机启动。

## 部署顺序

1. 安装 Node 22、pnpm 9.15.9、MySQL 8 和 ClamAV。
2. 项目放到 `C:\wwwroot\hongyun-react`，执行 `pnpm install --frozen-lockfile`。
3. 分别创建 `apps\cms\.env` 与 `apps\api\.env`，不要把生产密钥写入 Git。
4. 执行 `pnpm api:build` 和 `pnpm cms:build`。
5. 把 CMS 迁移包导入空的 MySQL 数据库，再创建 Strapi 读写 Token。
6. 用 `deploy\windows\start-cms.cmd` 与 `start-api.cmd` 本机验证 1337、3001。
7. 将 `deploy\windows\frontend-web.config` 复制到 `dist\web.config`。
8. CMS 独立 IIS 站点目录放置 `deploy\windows\cms-web.config`。
9. 本机和公网验收通过后，才把现有正式站点根目录切换到新 `dist`。

## 宝塔计划任务

- 每 10 分钟运行 `deploy\windows\run-resume-scan.cmd`。
- 每天 03:15 运行 `deploy\windows\run-retention-cleanup.cmd`。
- 每天运行：

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File C:\wwwroot\hongyun-react\scripts\ops\backup-cms.ps1 -BackupRoot C:\BtBackup\hongyun
```

备份至少保留数据库、CMS 上传文件、私密简历文件和 `SHA256SUMS`，并定期复制到服务器之外。

## 上线前安全项

- 宝塔面板开启 HTTPS，修改默认端口，并只允许管理 IP 访问。
- RDP、宝塔端口和 MySQL 不对全网开放；公网仅保留 80/443。
- CMS 后台域名限制公司固定出口 IP 或 VPN。
- 生产密钥全部随机生成；API 与 CMS 的 webhook secret 必须一致。
- 2 核 4 GB 暂时运行时，限制 MySQL 缓冲池和 Node 进程内存并监控 OOM；稳定上线后建议升级到至少 4 核 8 GB。
