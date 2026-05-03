# Traxle 3D Model Pipeline

Real project assets should be exported as `.glb` or `.gltf` files and referenced from `lib/projects.ts` with `modelPath`.

Recommended production optimization:
- Use compressed meshes where possible.
- Keep polygon counts reasonable for web and mobile devices.
- Optimize materials before export; avoid unused nodes, cameras, and lights.
- Keep texture references local and web-ready.
- Provide separate mobile-optimized versions for heavy models.

Suggested naming:
- `project-slug-desktop.glb`
- `project-slug-mobile.glb`
