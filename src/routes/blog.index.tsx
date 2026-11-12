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
  return (
    <div className="space-y-16">
      <PageHero
        title="Packaging Guides & Practical Printing Advice"
        text="No industry jargon or generic filler. Practical guides written specifically for Pakistani cafe owners, restaurant managers, and retail startups navigating packaging decisions."
      />

      <section className="container max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <BookOpen className="size-4 text-primary" />
            <span>Showing all {blogPosts.length} comprehensive guides</span>
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-medium">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">All Guides</span>
            <span className="rounded-full bg-muted px-3 py-1 text-muted-foreground">Cups & Beverages</span>
            <span className="rounded-full bg-muted px-3 py-1 text-muted-foreground">Food Packaging</span>
            <span className="rounded-full bg-muted px-3 py-1 text-muted-foreground">Design & Print</span>
          </div>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post: BlogPost) => (
            <article
              key={post.slug}
              className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lift"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="rounded-full bg-peach px-2.5 py-0.5 font-semibold text-navy">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="size-3" />
                    {post.readingTime}
                  </span>
                </div>

                <h2 className="mt-4 text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                  <Link to="/blog/$slug" params={{ slug: post.slug }}>
                    {post.title}
                  </Link>
                </h2>

                <p className="mt-3 text-sm text-muted-foreground line-clamp-3">
                  {post.summary}
                </p>
              </div>

              <div className="mt-6 border-t border-border pt-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <User className="size-3.5" />
                    {post.author.name}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="size-3.5" />
                    {post.publishedDate}
                  </span>
                </div>

                <div className="mt-4">
                  <Button asChild variant="outline" size="sm" className="w-full justify-between group-hover:border-primary/50 group-hover:bg-primary/5">
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
      <section className="container max-w-6xl">
        <div className="rounded-2xl border border-primary/20 bg-gradient-to-r from-peach/30 via-background to-peach/20 p-8 md:p-10">
          <div className="max-w-2xl space-y-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Sparkles className="size-3.5" />
              Free Artwork Pre-Flight
            </span>
            <h2 className="text-2xl font-bold text-foreground">Have Questions About Your Packaging Specs?</h2>
            <p className="text-sm text-muted-foreground">
              Don't guess on cup sizes or board thickness. Send us your logo or beverage menu, and our packaging team will prepare a free 3D digital mockup and recommend the most economical production spec for your launch.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Button asChild size="default" shimmer>
                <Link to="/quote" search={{ product: undefined }}>Get Free Mockup & Quote</Link>
              </Button>
              <Button asChild variant="outline" size="default">
                <Link to="/request-sample">Request Material Swatches</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <QuoteCTA />
    </div>
  );
}

