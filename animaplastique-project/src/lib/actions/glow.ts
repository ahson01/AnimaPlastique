// Cursor-tracked card border glow (see app.css `.ap-glow-card`).
// Attach to any card with the `ap-glow-card` class so its border lights up
// near the cursor (`--sx`/`--sy`).
export function cardGlow(node: HTMLElement) {
	if (typeof window === 'undefined') return;

	const onMove = (event: MouseEvent) => {
		const rect = node.getBoundingClientRect();
		node.style.setProperty('--sx', `${event.clientX - rect.left}px`);
		node.style.setProperty('--sy', `${event.clientY - rect.top}px`);
	};

	node.addEventListener('mousemove', onMove, { passive: true });

	return {
		destroy() {
			node.removeEventListener('mousemove', onMove);
		}
	};
}
