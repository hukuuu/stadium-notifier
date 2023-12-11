import { findAndNotify } from './stadium-notifier.ts'

//drain all parasite undelivered queue mesasges
// those were generated during exploration of kv.enqueue
const kv = await Deno.openKv();
kv.listenQueue(() => { console.log('draining parasite undelivered queue message'); });

//everyday at 7 in the morning
Deno.cron('Find and notify', '0 07 * * *', findAndNotify)
