# Stadium Notifier

Stadum Notifier finds football matches that will be played on specific stadiums every day and sends you a notification.

## Setup

### 1. You need

- [Deno](https://deno.com/)
- [Deno Deploy](https://deno.com/deploy)
- [RapidAPI](https://rapidapi.com/)
- Telegram for notifications

### 2. Env variables

- `TELEGRAM_API_TOKEN` - Telegram bot api token, see <https://core.telegram.org/bots/tutorial>
- `CHAT_ID` - Telegram chat id - where to send messages
- `MATCHES_API_KEY` - X-RapidAPI-Key property in <https://rapidapi.com/api-sports/api/api-football>

### 3. Deno Deploy setup

Create a new Deno Deploy project and link it to the main branch, main.ts file of this repo. This will automatically deploy stuff on the edge. Every push to main will make a new deploy.

### 4. Local development

```sh

TELEGRAM_API_TOKEN=xxx CHAT_ID=xxx MATCHES_API_KEY=xxx deno run -A --unstable main.ts
```
