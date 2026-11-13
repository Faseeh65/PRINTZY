# Printzy owner facts

## Confirmed by the owner

- **Base city:** Lahore, Pakistan — `businessFacts.location.city`
- **Owner:** Faizan Ali — `businessFacts.company.founderName`
- **Public role:** Owner — `businessFacts.company.founderRole`
- **Payment split:** 50% advance and 50% balance — `businessFacts.commercialPolicies.paymentTerms.advancePercent`
- **Balance milestone:** Before shipment dispatch — `businessFacts.commercialPolicies.paymentTerms.balanceMilestone`
- **WhatsApp response target:** 1–2 hours during business hours — `businessFacts.contact.responseTime`

## Still needed from the owner

Unknown values should stay `null` until confirmed. Do not publish estimates as facts.

| Owner input | Config key / content location |
|---|---|
| MOQ for each of the 8 products | `businessFacts.products[slug].moq` in `src/config/business-facts.ts` |
| Production lead time for each product | `businessFacts.products[slug].leadTimeDays` |
| Available product sizes and dimensions | `businessFacts.products[slug].sizes` |
| Starting price or price range (optional) | `businessFacts.products[slug].startingPrice` |
| Material/substrate specifications and supporting evidence | `businessFacts.products[slug].materials`; product content in `src/data/products.ts` |
| Accepted payment methods | `businessFacts.commercialPolicies.paymentTerms.acceptedMethods` |
| Design fee for new artwork | `businessFacts.commercialPolicies.designSupport.customDesignFee` |
| Sample cost, courier cost, whether sample cost is credited to a bulk order | `businessFacts.commercialPolicies.samplePolicy.swatchPackCourierFee`, `.printedProofFeeCreditedToBulk` |
| Courier partners and typical city delivery times | `businessFacts.commercialPolicies.couriers`; city content in `src/data/city-details.ts` |
| Export availability, MOQ, Incoterms, origin ports, shipping and payment options | `businessFacts.commercialPolicies.exportTerms` |
| Street address and map embed | `businessFacts.location.facilityAddress`, `.googleMapsEmbedUrl` |
| Legal name, NTN/SECP details, and founding year | `businessFacts.company.legalName`, `.ntn`, `.yearEstablished` |
| Domain email address | `businessFacts.contact.domainEmail` |
| Verified social profile URLs | `businessFacts.social.instagram`, `.facebook`, `.linkedin` |
| Verified brand count, if it should be shown publicly | `businessFacts.proofStats.brandsServed` |
| Real compliance certificates and food-contact documents | Add only evidenced documents to the quality/compliance content |
| Real product photos (at least 5 per category), permitted client logos, testimonials, and case studies | `src/data/images.ts`, `src/data/proof.ts`, and portfolio content |
| Real authors’ names, roles, bios, and photos | Blog author content and author profile routes |
| Quote submission email provider and destination | Server environment/configuration; do not put credentials in source |

## Product slugs

- `custom-paper-cups`
- `custom-pizza-boxes`
- `custom-food-boxes`
- `custom-takeaway-packaging`
- `custom-paper-bags`
- `custom-napkins-tissues`
- `cup-sleeves-stickers`
- `custom-mailer-gift-boxes`
