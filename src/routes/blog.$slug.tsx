import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import {
  Clock,
  Calendar,
  User,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Lightbulb,
  Package,
} from "lucide-react";
import { seo } from "@/lib/seo";
import { blogPosts, BlogPost } from "@/data/blog";
import { products } from "@/data/products";
import { site } from "@/data/site";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { QuoteCTA } from "@/components/site/sections";
import { trackGtmWhatsAppClick } from "@/lib/gtm";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = blogPosts.find((p) => p.slug === params.slug);
    if (!post) {
      throw notFound();
    }
    return { post };
  },
  head: ({ loaderData }) => {
    const data = loaderData as { post: BlogPost } | undefined;
    if (!data?.post) {
      return seo({
        title: "Packaging Guide | Printzy",
        description: "Practical packaging advice for Pakistani food and retail brands.",
        path: "/blog",
      });
    }
    const { post } = data;
    const siteUrl = site.url.replace(/\/$/, "");

    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.metaDescription,
      datePublished: post.publishedDate,
      dateModified: post.updatedDate,
      inLanguage: "en-PK",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${siteUrl}/blog/${post.slug}`,
      },
      author: {
        "@type": "Organization",
        name: post.author.name,
      },
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
    };

    return seo({
      title: post.seoTitle,
      description: post.metaDescription,
      path: `/blog/${post.slug}`,
      structuredData: articleSchema,
    });
  },
  component: BlogPostPage,
});

function BlogPostPage() {
  const { post } = Route.useLoaderData() as { post: BlogPost };
  const relatedProducts = products.filter((p) => post.relatedProductSlugs.includes(p.slug));

  return (
    <article className="space-y-12">
      {/* Article Header & Breadcrumbs */}
      <section className="border-b border-border bg-peach/10 py-10">
        <div className="container-site max-w-5xl">
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap items-center gap-2 text-xs text-muted-foreground"
          >
            <Link to="/" className="transition hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="size-3 text-muted-foreground/60" />
            <Link to="/blog" className="transition hover:text-foreground">
              Packaging Guides
            </Link>
            <ChevronRight className="size-3 text-muted-foreground/60" />
            <span className="font-medium text-foreground truncate max-w-xs">{post.title}</span>
          </nav>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="rounded-full bg-peach px-3 py-1 font-semibold text-navy">
                {post.category}
              </span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <Clock className="size-3.5" />
                {post.readingTime}
              </span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <Calendar className="size-3.5" />
                Updated: {post.updatedDate}
              </span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              {post.title}
            </h1>

            <p className="max-w-3xl text-lg text-muted-foreground">{post.summary}</p>

            <div className="flex items-center gap-3 pt-2 text-xs text-muted-foreground">
              <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                <User className="size-4" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{post.author.name}</p>
                <p className="text-muted-foreground">{post.author.role}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area: 2 Columns */}
      <section className="container-site max-w-5xl">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Main Content Body */}
          <div className="space-y-10 lg:col-span-8">
            {post.sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-24 space-y-4">
                <h2 className="text-2xl font-bold tracking-tight text-foreground">
                  {section.title}
                </h2>

                <div className="space-y-4 text-base leading-relaxed text-foreground/90">
                  {section.paragraphs.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                {/* Table if present */}
                {section.table && (
                  <div className="my-6 overflow-x-auto rounded-xl border border-border bg-card shadow-soft">
                    <table className="w-full text-left text-xs md:text-sm">
                      <thead className="border-b border-border bg-muted/60 text-muted-foreground">
                        <tr>
                          {section.table.headers.map((h, i) => (
                            <th key={i} className="px-4 py-3 font-semibold text-foreground">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {section.table.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="transition-colors hover:bg-muted/30">
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="px-4 py-3 text-foreground">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Checklist if present */}
                {section.checklist && (
                  <div className="my-6 rounded-2xl border border-primary/20 bg-primary/5 p-6 shadow-soft">
                    {section.checklist.title && (
                      <h3 className="mb-4 text-base font-bold text-foreground">
                        {section.checklist.title}
                      </h3>
                    )}
                    <ul className="space-y-3">
                      {section.checklist.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-foreground">
                          <CheckCircle2 className="size-4 shrink-0 text-primary mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Pro Tip Box if present */}
                {section.proTip && (
                  <div className="my-6 flex items-start gap-3.5 rounded-2xl border border-amber-500/20 bg-amber-50/60 dark:bg-amber-950/20 p-5 text-sm">
                    <Lightbulb className="size-5 shrink-0 text-amber-600 mt-0.5" />
                    <div>
                      <span className="font-bold text-amber-900 dark:text-amber-200">
                        Printzy Pro Tip:{" "}
                      </span>
                      <span className="text-amber-950/90 dark:text-amber-100/90">
                        {section.proTip}
                      </span>
                    </div>
                  </div>
                )}
              </section>
            ))}

            {/* In-article CTA box */}
            <div className="rounded-2xl border border-primary/20 bg-gradient-to-r from-peach/30 to-background p-6 md:p-8">
              <h3 className="text-xl font-bold text-foreground">
                Need a Digital Mockup with Your Logo?
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Email or WhatsApp your logo vector file. We will generate a free 3D digital mockup
                on your requested packaging format and confirm exact quantities and lead times.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button asChild size="default" shimmer>
                  <Link to="/quote" search={{ product: undefined }}>
                    Request Free Mockup & Quote
                  </Link>
                </Button>
                <Button
                  asChild
                  size="default"
                  variant="outline"
                  onClick={() => trackGtmWhatsAppClick("blog_in_article_cta")}
                >
                  <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon />
                    WhatsApp Us Directly
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Sticky Sidebar on Desktop */}
          <aside className="space-y-6 lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              {/* Table of Contents */}
              <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
                  In This Guide
                </h3>
                <nav className="mt-3 space-y-2 text-sm">
                  {post.tableOfContents.map((toc) => (
                    <a
                      key={toc.id}
                      href={`#${toc.id}`}
                      className="block text-muted-foreground transition hover:text-primary hover:underline"
                    >
                      &bull; {toc.title}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Related Products */}
              {relatedProducts.length > 0 && (
                <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                  <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-foreground">
                    <Package className="size-4 text-primary" />
                    Related Products
                  </h3>
                  <div className="mt-4 space-y-3">
                    {relatedProducts.map((p) => (
                      <Link
                        key={p.slug}
                        to="/products/$slug"
                        params={{ slug: p.slug }}
                        className="group flex items-center justify-between gap-3 rounded-xl border border-border/60 bg-muted/30 p-3 transition hover:border-primary/50 hover:bg-muted"
                      >
                        <div>
                          <p className="text-xs font-semibold text-foreground group-hover:text-primary">
                            {p.title}
                          </p>
                          <p className="text-[11px] text-muted-foreground">
                            MOQ {p.specs.moq} &bull; {p.specs.leadTime}
                          </p>
                        </div>
                        <ArrowRight className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Fast WhatsApp Help Box */}
              <div className="rounded-2xl border border-[#25D366]/30 bg-[#25D366]/5 p-5">
                <h4 className="text-sm font-bold text-foreground">Have Packaging Questions?</h4>
                <p className="mt-1 text-xs text-muted-foreground">
                  Our prepress team is ready to answer questions about sizes, file formats, and
                  delivery timelines.
                </p>
                <div className="mt-4">
                  <Button
                    asChild
                    size="sm"
                    className="w-full bg-[#25D366] text-white hover:bg-[#20ba59]"
                    onClick={() => trackGtmWhatsAppClick("blog_sidebar_button")}
                  >
                    <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">
                      <WhatsAppIcon />
                      Chat on WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Related Packaging Products Hub */}
      <section className="container-site max-w-5xl border-t border-border pt-12">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Explore Related Custom Packaging</h2>
          <Link to="/products" className="text-sm font-medium text-primary hover:underline">
            View All Products &rarr;
          </Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {products.slice(0, 3).map((prod) => (
            <div
              key={prod.slug}
              className="rounded-2xl border border-border bg-card p-5 shadow-soft"
            >
              <h3 className="text-base font-bold text-foreground">{prod.title}</h3>
              <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{prod.intro}</p>
              <div className="mt-4">
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link to="/products/$slug" params={{ slug: prod.slug }}>
                    View Specifications
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <QuoteCTA />
    </article>
  );
}
