export function getNavScrollOffset() {
  const value = getComputedStyle(document.documentElement).getPropertyValue('--nav-height').trim();
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) ? parsed + 8 : 86;
}

export function scrollToSectionById(id: string, behavior: ScrollBehavior = 'smooth') {
  const target = document.getElementById(id);
  if (!target) return false;

  const top = target.getBoundingClientRect().top + window.scrollY - getNavScrollOffset();
  window.scrollTo({ top: Math.max(0, top), behavior });
  return true;
}
