# Outcraft — campaign setup walkthrough (app.outcraft.ai, 2026-08-29)

Test campaign created: **"ZZ Research - Video (do not use)"** — id **1304**.
Objective: Book Appointment. Lead source: CSV File / Manual.
Company: reused an existing "Unnamed Company", so no new company was made.

**Nothing was published or launched.** The Review & Launch page has no
publish button until every required field is filled. It is still a draft.
Skipped on request: AI Available Actions, Debug, Admin Panel.
Stack note: the app is Laravel + Filament + Livewire.

---

## Step 0 — Create Campaign (modal)
Two fields only: Campaign Name, Company (new or existing). Then "Create".
Screenshot: 05-create-new-modal.png

## Step 1 — Choose Campaign Objective
Ten cards, each tagged Inbound or Outbound. Screenshot: 06-onboarding-step1.png

| Objective | Type |
| --- | --- |
| Book Appointment | Outbound |
| Recover Abandoned Checkout | Outbound |
| Upsell Post-Purchase | Outbound |
| Qualify Lead | Outbound |
| Send Information | Outbound |
| Post-Delivery Follow-Up | Outbound |
| Client Reactivation | Outbound |
| Provide Support | Inbound |
| Inbound Refund Request | Inbound |
| Qualify Inbound Lead | Inbound |

## Step 2 — Where Should This Campaign Get Leads From?
Nine sources. Screenshot: 07-onboarding-step2.png
Klaviyo · HubSpot · Attio · Custom API · Microsoft Dynamics ·
CSV File / Manual · Salesforce · Pipedrive · GoHighLevel

---

## The setup sidebar (14 pages)

Base URL: `/campaigns/{id}/onboarding/...`

### COMPANY
| Page | Route | What it holds |
| --- | --- | --- |
| Information | `company/identity` | Brand Name, Website URL, pronunciation guide toggle, US/Canada toggle |
| Industry | `company/industry` | Company Description, Problem You Solve, Differentiators, Ideal Customer Profile, FAQs |
| Compliance | `company/compliance` | Support Email, Terms link, Privacy link, Certifications, Compliance notes |

### CAMPAIGN
| Page | Route | What it holds |
| --- | --- | --- |
| Instructions | `campaign/context` | Campaign Brief, Discovery Questions, extra instruction sections |
| General Settings | `campaign/general` | Follow-ups (Positive / Undecided / Negative), Sendable Links & Codes, Hand-offs, Live meeting transfer |
| Schedule | `campaign/schedule` | Day checkboxes Mon–Sun, calling hours |
| Outreach Channels | `campaign/channels` | Voice & Calls, Email, SMS, WhatsApp — each a toggle + Configure |
| Booking | `campaign/booking` | Calendar service, Booking Link for Email, Booking Link for SMS |
| Outreach Sequence | `campaign/sequence` | The step table. Reorder actions / Add Step |
| Follow-Ups | `campaign/follow-up-sequence` | Ping Call / Ping Email / Ping SMS per response type |
| Conversation Intelligence | `campaign/evaluations` | Evaluation fields the AI fills after each interaction |

### AI AGENT
| Page | Route | What it holds |
| --- | --- | --- |
| Configuration | `agent` | Agent Name, Voice (e.g. "Bridget (Ultra-realistic)"), audio preview, Call background sound (Office), Email signature, per-language tabs, Add Language |

### FINISH
| Page | Route | What it holds |
| --- | --- | --- |
| Review & Launch | `finish` | Review, run a test, publish. Confetti on arrival. |

### ADVANCED (collapsed)
| Page | Route | What it holds |
| --- | --- | --- |
| Geographic Permissions | `countries` | Allowed destinations. Standard Rate vs Special Territory |
| Campaign Overrides | `overrides` | Which campaign wins when a contact qualifies for several |

Also present on every setup page: a **Test** button in the bottom bar
(runs a test call), and Back / Continue.

---

## Best video material found

### 1. The default outreach sequence — the hero shot
This is a rhythm. It is the product story with no words needed.

| # | Channel | Delay | Action |
| --- | --- | --- | --- |
| 1 | Call | — | Initial Call |
| 2 | Email | 5 minutes | Initial Email |
| 3 | Call | 6 hours | Initial Call |
| 4 | SMS | 1 day | Initial Sms |
| 5 | Call | 1 day | Initial Call |
| 6 | Email | 2 days | Initial Email |
| 7 | Call | 2 days | Initial Call |
| 8 | — | 3 days | Campaign End |

Use case: type each delay as a beat. "Now. 5 minutes. 6 hours. 1 day."
It shows persistence better than any sentence.
Screenshot: 16-campaign-sequence.png

### 2. The objective grid
Ten named moments. Real customer language, already written by you.
Good for a fast card-flash sequence. Screenshot: 06-onboarding-step1.png

### 3. The four channel toggles
Voice · Email · SMS · WhatsApp, each a purple switch flicking on.
One clean motion beat. Screenshot: 14-campaign-channels.png

### 4. "Call background sound: Office"
A tiny human detail. The AI call has office noise behind it, so it
sounds real. Strong for the sound-design story. Screenshot: 19-agent-configuration.png

### 5. The Performance Funnel
Campaign Runs → Engaged → Successful Outcomes.
Screenshot: 02-analytics-overview.png

## All screenshots
research/screens/01 … 22 (see file names above)
