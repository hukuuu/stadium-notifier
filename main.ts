import { findAndNotify } from './stadium-notifier.ts'

//everyday at 7 in the morning
Deno.cron('Find and notify', '0 07 * * *', findAndNotify)
