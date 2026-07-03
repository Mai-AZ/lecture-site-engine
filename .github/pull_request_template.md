## Summary

<!-- What lecture(s) are you adding or updating? -->

- Subject: `year-N/subject-id`
- Files: `lectures/parN.md` (or `parN-secN.md`)

## Checklist

- [ ] Only changed files under `subjects/year-N/subject-id/lectures/*.md`
- [ ] Filenames follow `parN.md` or `parN-secN.md`
- [ ] Content follows `SCHEMA.md`
- [ ] Did **not** hand-edit `manifest.json` `files` (CI auto-syncs icons & badges)
- [ ] Local validate passes: `npm run validate -- --subject year-N/subject-id`

## Test plan

- [ ] **Validate lectures** CI check is green
- [ ] Preview built site locally (optional): `npm run build -- --subject year-N/subject-id`
