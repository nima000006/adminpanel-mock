import VideoPlayer from "./VideoPlayer";

// ─── Sample assets ────────────────────────────────────────────────────────────
const sampleVideoUrl =
  "https://cdn.maktabkhooneh.org/videos/45220633846777761742046589.mp4?expire=1779701238&token=41938094c8db74d70f4776b5386199da&md5=QZOAlMjbdNcPR3a1OGGZ2g==";
const samplePosterUrl =
  "https://cdn.maktabkhooneh.org/thumbs/45220633846777761742046589.jpg?expire=1779614838&token=39035eb57b621de345dc4493e5a01b67&md5=OQNetXtiHeNF3EST5aAbZw==";

// Simulated alternate-quality URLs (point to the same file here; swap with real HLS/DASH urls in production)
const hdUrl = sampleVideoUrl;
const sdUrl = sampleVideoUrl;

// ─── Layout helpers ───────────────────────────────────────────────────────────
const grid = { display: "grid", gap: 32, maxWidth: 960 } as const;
const section = { display: "grid", gap: 12 } as const;
const label = { fontSize: 16, fontWeight: 600 } as const;
const note = { fontSize: 13, color: "#666", lineHeight: 1.6 } as const;
const hr = { border: "none", borderTop: "1px solid #e5e5e5", margin: "8px 0" } as const;

// ─────────────────────────────────────────────────────────────────────────────

const VideoPlayerExample = () => (
  <div style={grid}>
    {/* ── 1. Basic: single src, no extras ──────────────────────────────────── */}
    <section style={section}>
      <div style={label}>۱. پخش ساده — تنها آدرس ویدیو</div>
      <p style={note}>
        حداقلی‌ترین حالت. فقط <code>src</code> کافی است؛ بدون پوستر، بدون عنوان.
      </p>
      <VideoPlayer src={sampleVideoUrl} />
    </section>

    <hr style={hr} />

    {/* ── 2. With poster + title ────────────────────────────────────────────── */}
    <section style={section}>
      <div style={label}>۲. با پوستر و عنوان</div>
      <p style={note}>
        <code>poster</code> تصویر پیش‌نمایش را نشان می‌دهد.
        <code>title</code> نوشته‌ای را در گوشه بالا-چپ قرار می‌دهد.
      </p>
      <VideoPlayer
        src={sampleVideoUrl}
        poster={samplePosterUrl}
        posterAlt="LPIC-1 730 course preview"
        title="LPIC-1 — دوره جامع لینوکس"
      />
    </section>

    <hr style={hr} />

    {/* ── 3. Multiple sources (quality fallback) ────────────────────────────── */}
    <section style={section}>
      <div style={label}>۳. چند منبع — کیفیت‌های مختلف</div>
      <p style={note}>
        با <code>sources</code> می‌توانید چند URL با نوع MIME متفاوت بدهید. مرورگر اولین
        فرمت پشتیبانی‌شده را انتخاب می‌کند (مثلاً MP4، WebM، HLS).
      </p>
      <VideoPlayer
        title="LPIC-1 — چند کیفیت"
        poster={samplePosterUrl}
        sources={[
          { src: hdUrl, type: "video/mp4" }, // HD
          { src: sdUrl, type: "video/mp4" }, // SD fallback
        ]}
      />
    </section>

    <hr style={hr} />

    {/* ── 4. AutoPlay + muted + loop ────────────────────────────────────────── */}
    <section style={section}>
      <div style={label}>۴. پخش خودکار بی‌صدا + حلقه</div>
      <p style={note}>
        مناسب برای پیش‌نمایش‌های بنری یا هیرو. مرورگرها <code>autoPlay</code> را فقط وقتی{" "}
        <code>muted</code> باشد مجاز می‌دانند.
      </p>
      <VideoPlayer
        src={sampleVideoUrl}
        poster={samplePosterUrl}
        title="پیش‌نمایش بنری"
        autoPlay
        muted
        loop
        aspectRatio="21 / 9"
      />
    </section>

    <hr style={hr} />

    {/* ── 5. Custom aspect ratio ────────────────────────────────────────────── */}
    <section style={section}>
      <div style={label}>۵. نسبت تصویر سفارشی</div>
      <p style={note}>
        مقدار پیش‌فرض <code>aspectRatio</code> برابر <code>"16 / 9"</code> است. می‌توانید
        هر نسبتی مثل <code>"4 / 3"</code>، <code>"1 / 1"</code> یا <code>"9 / 16"</code>{" "}
        بدهید.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={section}>
          <div style={{ fontSize: 13, fontWeight: 500 }}>4 / 3 (کلاسیک)</div>
          <VideoPlayer src={sampleVideoUrl} aspectRatio="4 / 3" />
        </div>
        <div style={section}>
          <div style={{ fontSize: 13, fontWeight: 500 }}>1 / 1 (مربع)</div>
          <VideoPlayer src={sampleVideoUrl} aspectRatio="1 / 1" />
        </div>
      </div>
    </section>

    <hr style={hr} />

    {/* ── 6. Custom skip step ───────────────────────────────────────────────── */}
    <section style={section}>
      <div style={label}>۶. گام پرش سفارشی</div>
      <p style={note}>
        پیش‌فرض دکمه‌های جلو/عقب ۱۰ ثانیه است. با <code>skipStep</code> می‌توانید مثلاً ۳۰
        ثانیه تنظیم کنید.
      </p>
      <VideoPlayer
        src={sampleVideoUrl}
        poster={samplePosterUrl}
        title="گام ۳۰ ثانیه‌ای"
        skipStep={30}
      />
    </section>

    <hr style={hr} />

    {/* ── 7. Disabled hotkeys ───────────────────────────────────────────────── */}
    <section style={section}>
      <div style={label}>۷. کلیدهای میانبر غیرفعال</div>
      <p style={note}>
        وقتی پلیر داخل یک فرم یا ویرایشگر متن است، می‌توانید{" "}
        <code>hotkeys={"{false}"}</code> بگذارید تا تداخل پیش نیاید.
      </p>
      <VideoPlayer src={sampleVideoUrl} title="بدون کلید میانبر" hotkeys={false} />
    </section>

    <hr style={hr} />

    {/* ── 8. Subtitles / Captions ───────────────────────────────────────────── */}
    <section style={section}>
      <div style={label}>۸. زیرنویس و کپشن</div>
      <p style={note}>
        با <code>tracks</code> می‌توانید یک یا چند فایل <code>.vtt</code> بدهید. دکمه CC
        در نوار کنترل ظاهر می‌شود. کلید <kbd>C</kbd> هم بین زیرنویس‌ها سوییچ می‌کند.
        فایل‌های زیر نمونه هستند — مسیر واقعی را جایگزین کنید.
      </p>
      <VideoPlayer
        src={sampleVideoUrl}
        poster={samplePosterUrl}
        title="ویدیو با زیرنویس"
        tracks={[
          {
            src: "/captions/fa.vtt",
            kind: "captions",
            label: "فارسی",
            srcLang: "fa",
            default: true, // این زیرنویس به‌صورت پیش‌فرض فعال است
          },
          {
            src: "/captions/en.vtt",
            kind: "subtitles",
            label: "English",
            srcLang: "en",
          },
          {
            src: "/captions/ar.vtt",
            kind: "subtitles",
            label: "العربية",
            srcLang: "ar",
          },
        ]}
      />
    </section>

    <hr style={hr} />

    {/* ── 9. Preload none (saves bandwidth) ────────────────────────────────── */}
    <section style={section}>
      <div style={label}>۹. بدون پیش‌بارگذاری</div>
      <p style={note}>
        <code>preload="none"</code> هیچ داده‌ای را تا زمان کلیک کاربر دانلود نمی‌کند. برای
        صفحاتی با ویدیوهای زیاد مفید است.
      </p>
      <VideoPlayer
        src={sampleVideoUrl}
        poster={samplePosterUrl}
        title="بدون پیش‌بارگذاری"
        preload="none"
      />
    </section>

    <hr style={hr} />

    {/* ── 10. No source (placeholder state) ────────────────────────────────── */}
    <section style={section}>
      <div style={label}>۱۰. بدون منبع — حالت placeholder</div>
      <p style={note}>
        وقتی نه <code>src</code> دارید نه <code>sources</code>، پلیر پیام خطای درونی نشان
        می‌دهد. مفید برای وقتی آدرس هنوز بارگذاری نشده.
      </p>
      <VideoPlayer title="ویدیویی انتخاب نشده" />
    </section>
  </div>
);

export default VideoPlayerExample;
