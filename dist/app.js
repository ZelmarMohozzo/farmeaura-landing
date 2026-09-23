'use strict';
const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() { navigation.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Abrir menú'); }
toggle.addEventListener('click', () => { const open = navigation.classList.toggle('open'); toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú'); });
navigation.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && navigation.classList.contains('open')) { closeMenu(); toggle.focus(); } });
const form = document.querySelector('#waitlist');
const status = document.querySelector('#form-status');
const endpoint = window.FARMEAURA_CONFIG?.waitlistEndpoint;
if (endpoint) document.querySelector('#form-note').textContent = 'Usaremos tu correo únicamente para avisarte del acceso anticipado.';
form.addEventListener('submit', async event => {
  event.preventDefault();
  const name = form.elements.name;
  name.setCustomValidity(name.value.trim().length < 2 ? 'Ingresá al menos dos caracteres.' : '');
  if (!form.reportValidity()) return;
  const button = form.querySelector('button');
  const original = button.innerHTML;
  button.disabled = true; form.setAttribute('aria-busy', 'true'); status.textContent = ''; button.textContent = 'VALIDANDO…';
  let timeout;
  try {
    if (!endpoint) { await new Promise(resolve => setTimeout(resolve, 450)); status.textContent = '¡Todo correcto! Es una prueba: no se envió ni se guardó tu registro. El acceso anticipado todavía no está habilitado.'; return; }
    button.textContent = 'ENVIANDO…';
    const controller = new AbortController(); timeout = setTimeout(() => controller.abort(), 12000);
    const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: name.value.trim(), email: form.elements.email.value.trim() }), signal: controller.signal });
    const data = await response.json().catch(() => null);
    if (!response.ok || data?.ok !== true) throw new Error('submission-failed');
    status.textContent = '¡Ya estás en la lista! Te avisamos cuando abra el acceso anticipado.'; form.reset();
  } catch { status.textContent = 'No pudimos registrar tu correo. Probá de nuevo en unos minutos.'; }
  finally { clearTimeout(timeout); button.disabled = false; button.innerHTML = original; form.removeAttribute('aria-busy'); }
});
form.elements.name.addEventListener('input', () => form.elements.name.setCustomValidity(''));
