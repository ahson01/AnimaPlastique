<!-- Vercel-style ambient backdrop: dot grid, center bloom, corner bloom.
	Place as the first child of a `relative isolate overflow-hidden` section. -->
<div
	aria-hidden="true"
	class="ap-glow-layer pointer-events-none absolute inset-0 -z-10 overflow-hidden"
>
	<div class="ap-dot-grid absolute inset-x-0 top-0 h-[44rem]"></div>

	<div
		class="ap-hero-glow absolute top-0 left-1/2 h-[46rem] w-[170%] -translate-x-1/2"
	></div>

	<div class="ap-corner-glow absolute right-0 bottom-0 h-[36rem] w-[36rem]"></div>
</div>
