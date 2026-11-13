import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Clock, Calendar, User, Sparkles } from "lucide-react";
import { seo } from "@/lib/seo";
import { blogPosts, BlogPost } from "@/data/blog";
import { PageHero, QuoteCTA } from "@/components/site/sections";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/blog/")({
  head: () =>
    seo({
      title: "Packaging Guides & Advice for Pakistani Food Brands | Printzy",
      description:
        "Practical guides on paper cups, pizza box board strength, packaging MOQs, and print artwork preparation for cafes and restaurants in Pakistan.",
      path: "/blog",
    }),
  component: BlogIndexPage,
});

function BlogIndexPage() {
  const [activeCategory, setActiveCategory] = useState("All Guides");
  const categories = ["All Guides", ...new Set(blogPosts.map((post) => post.category))];
  const visiblePosts =
    activeCategory === "All Guides"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

  return (
    <>
      <PageHero
        title="Packaging Guides & Practical Printing Advice"
        text="No industry jargon or generic filler. Practical guides written specifically for Pakistani cafe owners, restaurant managers, and retail startups navigating packaging decisions."
      />

      <section className="container-site max-w-6xl pb-16 pt-8 sm:pt-10 md:pb-20 md:pt-12">
        <div className="flex flex-col gap-5 border-b border-border pb-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <BookOpen className="size-4 shrink-0 text-primary" aria-hidden="true" />
            <span aria-live="polite">
              {activeCategory === "All Guides"
                ? `Showing all ${visiblePosts.length} guides`
                : `Showing ${visiblePosts.length} ${activeCategory} guides`}
            </span>
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter guides by topic">
            {categories.map((category) => {
              const selected = category === activeCategory;
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setActiveCategory(category)}
                  className={`inline-flex min-h-11 cursor-pointer items-center rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    selected
                      ? "border-secondary bg-secondary text-secondary-foreground"
                      : "border-border bg-card text-muted-foreground hover:border-secondary/50 hover:text-foreground"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 grid auto-rows-fr gap-5 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visiblePosts.map((post: BlogPost) => (
            <article
              key={post.slug}
              className="group flex h-full min-w-0 flex-col rounded-2xl border border-border/80 bg-card p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:shadow-lift sm:p-6"
            >
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="rounded-full bg-accent px-3 py-1 font-semibold text-navy">
                    {post.category}
                  </span>
                  <span className="flex shrink-0 items-center gap-1.5 text-muted-foreground">
                    <Clock className="size-3.5" aria-hidden="true" />
                    {post.readingTime}
                  </span>
                </div>

                <h2 className="mt-5 text-xl font-bold leading-snug tracking-tight text-foreground transition-colors group-hover:text-secondary">
                  <Link to="/blog/$slug" params={{ slug: post.slug }}>
                    {post.title}
                  </Link>
                </h2>

                <p className="mt-3 text-sm text-muted-foreground line-clamp-3">{post.summary}</p>
              </div>

              <div className="mt-6 border-t border-border pt-4">
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 text-xs text-muted-foreground">
                  <span className="flex min-w-0 items-center gap-1.5">
                    <User className="size-3.5 shrink-0" aria-hidden="true" />
                    {post.author.name}
                  </span>
                  <span className="flex shrink-0 items-center gap-1.5">
                    <Calendar className="size-3.5" aria-hidden="true" />
                    {post.publishedDate}
                  </span>
                </div>

                <div className="mt-4">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="w-full justify-between group-hover:border-primary/50 group-hover:bg-primary/5"
                  >
                    <Link to="/blog/$slug" params={{ slug: post.slug }}>
                      <span>Read Guide</span>
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Trust & Assistance Banner */}
      <section className="container-site max-w-6xl pb-16 md:pb-20">
        <div className="rounded-3xl border border-border/80 bg-gradient-to-br from-accent via-card to-background p-6 shadow-soft sm:p-8 md:p-10">
          <div className="max-w-2xl space-y-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Sparkles className="size-3.5" />
              Free Artwork Pre-Flight
            </span>
            <h2 className="text-2xl font-bold text-foreground">
              Have Questions About Your Packaging Specs?
            </h2>
            <p className="text-sm text-muted-foreground">
              Don't guess on cup sizes or board thickness. Send us your logo or beverage menu, and
              our packaging team will prepare a free 3D digital mockup and recommend the most
              economical production spec for your launch.
            </p>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap">
              <Button asChild size="default" shimmer>
                <Link to="/quote" search={{ product: undefined }}>
                  Get Free Mockup & Quote
                </Link>
              </Button>
              <Button asChild variant="outline" size="default">
                <Link to="/request-sample">Request Material Swatches</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <QuoteCTA />
    </>
  );
}
