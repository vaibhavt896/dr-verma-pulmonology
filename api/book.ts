// Vercel serverless function.
// Receives an appointment from the booking modal and delivers it to the
// clinic's WhatsApp automatically via CallMeBot, so the doctor gets the
// patient's details the moment they confirm — no manual "Send" tap needed.
//
// Required environment variables (set in the Vercel dashboard):
//   CALLMEBOT_PHONE  - the doctor's WhatsApp number in international format,
//                      e.g. +919454097191 (the number registered with CallMeBot)
//   CALLMEBOT_APIKEY - the API key CallMeBot gives the doctor after activation
//
// The API key lives only here on the server and is never exposed to the browser.

type BookingBody = {
    name?: string;
    phone?: string;
    date?: string;
    time?: string;
    type?: string;
    symptoms?: string;
};

// Minimal request/response shapes so this compiles without @vercel/node types.
interface Req {
    method?: string;
    body?: unknown;
}
interface Res {
    status: (code: number) => Res;
    json: (data: unknown) => void;
}

export default async function handler(req: Req, res: Res) {
    if (req.method !== 'POST') {
        res.status(405).json({ ok: false, error: 'Method not allowed' });
        return;
    }

    const apiKey = process.env.CALLMEBOT_APIKEY;
    const clinicPhone = process.env.CALLMEBOT_PHONE;
    if (!apiKey || !clinicPhone) {
        res.status(500).json({ ok: false, error: 'WhatsApp sender not configured' });
        return;
    }

    // Vercel usually parses JSON bodies automatically; guard for raw strings too.
    let body: BookingBody = {};
    if (typeof req.body === 'string') {
        try { body = JSON.parse(req.body) as BookingBody; } catch { body = {}; }
    } else if (req.body && typeof req.body === 'object') {
        body = req.body as BookingBody;
    }

    const name = body.name?.trim();
    const phone = body.phone?.trim();
    const date = body.date?.trim();
    const time = body.time?.trim();
    if (!name || !phone || !date || !time) {
        res.status(400).json({ ok: false, error: 'Missing required fields' });
        return;
    }

    // Short, professional, to-the-point message for the doctor.
    const message = [
        'New Appointment Request',
        'Patel Chest & Allergy Clinic',
        '',
        `Patient: ${name}`,
        `Phone: ${phone}`,
        `Date: ${date}`,
        `Time: ${time}`,
        `Type: ${body.type?.trim() || 'Consultation'}`,
        `Symptoms: ${body.symptoms?.trim() || 'Not specified'}`,
    ].join('\n');

    const url =
        'https://api.callmebot.com/whatsapp.php' +
        `?phone=${encodeURIComponent(clinicPhone)}` +
        `&text=${encodeURIComponent(message)}` +
        `&apikey=${encodeURIComponent(apiKey)}`;

    try {
        const cbRes = await fetch(url);
        const text = await cbRes.text();
        // CallMeBot answers 200 with a text body for both success and failure,
        // so treat known error phrases (and non-2xx) as a failed send.
        const failed = !cbRes.ok || /not valid|missing|error|invalid|denied|didn.?t/i.test(text);
        if (failed) {
            res.status(502).json({ ok: false, error: 'WhatsApp send failed', detail: text.slice(0, 300) });
            return;
        }
        res.status(200).json({ ok: true });
    } catch (err) {
        res.status(502).json({ ok: false, error: 'WhatsApp send failed', detail: String(err) });
    }
}
