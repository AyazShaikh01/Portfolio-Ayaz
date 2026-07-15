// ── CONFIG ──
const GITHUB_USER = 'ayazshaikh'; // replace with your GitHub username
const LINKEDIN = 'https://linkedin.com/in/ayazshaikh'; // replace
const EMAIL = 'ayaz@example.com'; // replace

// ── DOM READY ──
document.addEventListener('DOMContentLoaded', () => {

    // ── CURSOR ──
    (function cursor() {
        const cursor = document.getElementById('cursor');
        const ring = document.getElementById('cursor-ring');
        let mx = 0,
            my = 0,
            rx = 0,
            ry = 0;
        document.addEventListener('mousemove', e => {
            mx = e.clientX;
            my = e.clientY;
            cursor.style.left = mx + 'px';
            cursor.style.top = my + 'px';
        });

        function animRing() {
            rx += (mx - rx) * 0.12;
            ry += (my - ry) * 0.12;
            ring.style.left = rx + 'px';
            ring.style.top = ry + 'px';
            requestAnimationFrame(animRing);
        }
        animRing();

        document.querySelectorAll('a, button, .term-input, .repo-card, .contact-item').forEach(el => {
            el.addEventListener('mouseenter', () => {
                ring.style.width = '44px';
                ring.style.height = '44px';
                ring.style.borderColor = 'rgba(34,211,238,0.7)';
            });
            el.addEventListener('mouseleave', () => {
                ring.style.width = '28px';
                ring.style.height = '28px';
                ring.style.borderColor = 'rgba(34,211,238,0.35)';
            });
        });
    })();

    // ── SCROLL REVEAL ──
    (function reveals() {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) e.target.classList.add('visible');
            });
        }, { threshold: 0.12 });
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    })();

    // ── SKILL BAR ANIMATION ──
    (function skillBars() {
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.querySelectorAll('.skill-level-fill').forEach(f => {
                        const w = f.style.width;
                        f.style.width = '0';
                        requestAnimationFrame(() => {
                            setTimeout(() => { f.style.width = w; }, 120);
                        });
                    });
                    obs.unobserve(e.target);
                }
            });
        }, { threshold: 0.3 });
        const grid = document.querySelector('.skills-grid');
        if (grid) obs.observe(grid);
    })();

    // ── TERMINAL ──
    const termOutput = document.getElementById('term-output');
    const cmdInput = document.getElementById('cmd-input');
    const termBody = document.getElementById('term-body');
    let hist = [],
        hidx = -1;

    function scrollTerm() {
        requestAnimationFrame(() => { termBody.scrollTop = termBody.scrollHeight; });
    }

    function mkBlock() {
        const b = document.createElement('div');
        b.className = 'output-block';
        termOutput.appendChild(b);
        return b;
    }

    function termHtml(html) {
        const b = mkBlock();
        b.innerHTML = html;
        scrollTerm();
    }

    function termText(text, cls = '') {
        const b = mkBlock();
        const span = document.createElement('div');
        span.className = cls;
        span.textContent = text;
        b.appendChild(span);
        scrollTerm();
    }

    function wait(ms) { return new Promise(r => setTimeout(r, ms)); }

    // ── BOOT ──
    async function boot() {
        const bootSeq = [
            { t: 'Initialising portfolio environment...', cls: 'boot-ok', d: 100 },
            { t: 'Loading kernel modules', cls: 'boot-ok', d: 180 },
            { t: 'Mounting filesystems', cls: 'boot-ok', d: 260 },
            { t: 'Starting network interfaces', cls: 'boot-ok', d: 340 },
            { t: 'portfolio.service starting', cls: 'boot-warn', d: 420 },
            { t: 'portfolio.service: active (running)', cls: 'boot-ok', d: 520 },
        ];

        const blk = mkBlock();
        for (const l of bootSeq) {
            await wait(l.d);
            const el = document.createElement('div');
            el.className = `boot-line ${l.cls}`;
            el.textContent = l.t;
            blk.appendChild(el);
            scrollTerm();
        }

        await wait(200);

        const msg = mkBlock();
        msg.innerHTML = `
          <div style="color:var(--muted);font-size:12px;margin-top:4px;">
            Type <span style="color:var(--accent)">help</span> to see available commands.
            <span style="display:inline-block;width:8px;height:1em;background:var(--accent);vertical-align:text-bottom;animation:blink 1s step-end infinite;margin-left:2px;"></span>
          </div>`;
        scrollTerm();
        cmdInput.focus();
    }

    // ── COMMANDS ──
    const commands = {

        help() {
            termHtml(`
            <div class="section-hd">Available Commands</div>
            <div class="help-row"><span class="help-cmd">whoami</span><span class="help-desc">Quick identity summary</span></div>
            <div class="help-row"><span class="help-cmd">about</span><span class="help-desc">Full bio — opens detail panel</span></div>
            <div class="help-row"><span class="help-cmd">skills</span><span class="help-desc">Tech stack with proficiency bars</span></div>
            <div class="help-row"><span class="help-cmd">projects</span><span class="help-desc">Labs and side projects</span></div>
            <div class="help-row"><span class="help-cmd">education</span><span class="help-desc">Degree &amp; academic info</span></div>
            <div class="help-row"><span class="help-cmd">github</span><span class="help-desc">Live GitHub profile &amp; repos</span></div>
            <div class="help-row"><span class="help-cmd">contact</span><span class="help-desc">LinkedIn, GitHub, Email</span></div>
            <div class="help-row"><span class="help-cmd">clear</span><span class="help-desc">Clear terminal output</span></div>
            <div style="margin-top:8px" class="out-dim">↑ ↓ history · Tab autocomplete</div>
          `);
        },

        whoami() {
            termHtml(`
            <div class="whoami-box">
              <div class="line">uid=1000(ayaz) gid=1000(ayaz) groups=linux,networking,devops</div>
            </div>
            <div class="help-row"><span class="help-cmd">Name</span><span class="help-desc">AyazAhmed Shaikh</span></div>
            <div class="help-row"><span class="help-cmd">Role</span><span class="help-desc">Computer Engineering Student</span></div>
            <div class="help-row"><span class="help-cmd">Specialization</span><span class="help-desc">Linux System Administration, Computer Networking, DevOps</span></div>
            <div class="help-row"><span class="help-cmd">Location</span><span class="help-desc">Ahmedabad, Gujarat, India</span></div>
            <div class="help-row"><span class="help-cmd">Status</span><span class="help-desc">Open to Work</span></div>
            <div class="help-row"><span class="help-cmd">Platforms</span><span class="help-desc">RHEL, CentOS, Ubuntu</span></div>
            <div class="help-row"><span class="help-cmd">Editor</span><span class="help-desc">vim</span></div>
          `);
        },

        about() { openPanel(); },

        skills() {
            termHtml(`
            <div class="section-hd">Core Skills</div>
            ${skillRow('Linux Administration',75)}
            ${skillRow('Computer Networking', 60)}
            ${skillRow('Containers', 55)}
            ${skillRow('Tools (Git/Bash)', 65)}
            <div class="section-hd" style="margin-top:14px">Linux Administration</div>
            <div class="out-dim">RHEL &nbsp;·&nbsp; CentOS &nbsp;·&nbsp; Ubuntu &nbsp;·&nbsp; User &amp; Group Mgmt &nbsp;·&nbsp; ACLs &nbsp;·&nbsp; systemd &nbsp;·&nbsp; Storage &nbsp;·&nbsp; Journald &nbsp;·&nbsp; SSH &nbsp;·&nbsp; Cron</div>
            <div class="section-hd" style="margin-top:14px">Networking</div>
            <div class="out-dim">TCP/IP &nbsp;·&nbsp; IPv4 Addressing &nbsp;·&nbsp; DNS &nbsp;·&nbsp; Routing &nbsp;·&nbsp; nmcli &nbsp;·&nbsp; Basic Firewall Config</div>
            <div class="section-hd" style="margin-top:14px">Containers &amp; Tools</div>
            <div class="out-dim">Docker &nbsp;·&nbsp; Podman &nbsp;·&nbsp; Git &nbsp;·&nbsp; GitHub &nbsp;·&nbsp; VirtualBox &nbsp;·&nbsp; VMware &nbsp;·&nbsp; Bash</div>
            <div style="margin-top:8px" class="out-dim">Run <span class="out-amber">about</span> to open full detail view</div>
          `);
            setTimeout(animTermBars, 80);
        },

        projects() {
            termHtml(`
            <div class="section-hd">Labs &amp; Projects</div>
            ${projCard('01 / HomeLab', 'in progress', 'Self-hosted virtual lab environment for practicing Linux system administration and networking — deploy, configure, troubleshoot, break, and rebuild systems in isolation.', ['RHEL','Ubuntu','Virtual Machines','SSH','Networking'])}
            ${projCard('02 / Interactive Portfolio', 'live', 'Terminal-inspired portfolio built with HTML, CSS &amp; JavaScript to showcase Linux admin skills, networking knowledge, and technical projects. The site is the demo.', ['HTML','CSS','JavaScript'])}
            <div style="margin-top:8px" class="out-dim">Run <span class="out-amber">github</span> to see live repos</div>
          `);
        },

        education() {
            termHtml(`
            <div class="section-hd">Education</div>
            <div class="whoami-box">
              <div class="line">Bachelor of Technology (B.Tech) — Computer Engineering</div>
              <div class="desc">Silver Oak University, Ahmedabad, Gujarat<br />
              2022 — 2026<br />
              CGPA: 8.26</div>
            </div>
          `);
        },

        async github() {
            termHtml(`<div class="out-dim">Fetching <span class="out-amber">${GITHUB_USER}</span> from api.github.com …</div>`);
            scrollTerm();
            try {
                const [uRes, rRes] = await Promise.all([
                    fetch(`https://api.github.com/users/${GITHUB_USER}`),
                    fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=8`)
                ]);
                if (!uRes.ok) throw new Error(`User "${GITHUB_USER}" not found — check GITHUB_USER.`);
                const u = await uRes.json();
                const repos = (await rRes.json()).filter(r => !r.fork).slice(0, 5);

                termHtml(`
                <div class="gh-profile">
                  <div class="gh-name">@${u.login}${u.name ? ' &nbsp;·&nbsp; ' + u.name : ''}</div>
                  <div class="gh-bio">${u.bio || 'No bio set.'}</div>
                  <div class="gh-stats">
                    <div>Repos: <span>${u.public_repos}</span></div>
                    <div>Followers: <span>${u.followers}</span></div>
                    <div>Following: <span>${u.following}</span></div>
                  </div>
                </div>
                <div class="section-hd">Recent Repos</div>
                ${repos.map(r => `
                  <div class="repo-card" onclick="window.open('${r.html_url}','_blank')">
                    <div class="repo-name">${r.name}</div>
                    <div class="repo-desc">${r.description || '(no description)'}</div>
                    <div class="repo-meta">
                      <span class="repo-lang">${r.language || '—'}</span>
                      <span>★ ${r.stargazers_count}</span>
                      <span>⑂ ${r.forks_count}</span>
                      <span>${ago(r.updated_at)}</span>
                    </div>
                  </div>
                `).join('')}
                <div style="margin-top:8px" class="out-dim">Click a repo card to open on GitHub</div>
              `);
            } catch (e) {
                termHtml(`<div class="out-red">Error: ${e.message}</div>`);
            }
        },

        contact() {
            termHtml(`
            <div class="section-hd">Contact</div>
            <div class="contact-item"><span class="cl">location</span><span class="cu" style="color:var(--text)">Ahmedabad, Gujarat, India</span></div>
            <div class="contact-item"><span class="cl">status</span><span class="cu">Open to Work</span></div>
            <div class="contact-item" onclick="window.open('${LINKEDIN}','_blank')">
              <span class="cl">linkedin</span><span class="cu">${LINKEDIN}</span><span class="co">↗ open</span>
            </div>
            <div class="contact-item" onclick="window.open('https://github.com/${GITHUB_USER}','_blank')">
              <span class="cl">github</span><span class="cu">github.com/${GITHUB_USER}</span><span class="co">↗ open</span>
            </div>
            <div class="contact-item" onclick="window.location.href='mailto:${EMAIL}'">
              <span class="cl">email</span><span class="cu">${EMAIL}</span><span class="co">↗ open</span>
            </div>
            <div style="margin-top:10px" class="out-dim">Click any row &nbsp;·&nbsp; or run <span class="out-amber">github</span> for live profile</div>
          `);
        },

        clear() {
            termOutput.innerHTML = '';
        }
    };

    function skillRow(label, pct) {
        return `<div class="skill-row">
            <span style="color:var(--text)">${label}</span>
            <div class="skill-bar"><div class="skill-fill" data-w="${pct}"></div></div>
            <span class="skill-pct">${pct}%</span>
          </div>`;
    }

    function projCard(title, status, desc, tags) {
        return `<div class="proj-card">
            <div class="proj-title">${title}<span class="proj-status">[${status}]</span></div>
            <div class="proj-desc">${desc}</div>
            <div class="proj-tags">${tags.map(t => `<span class="proj-tag">${t}</span>`).join('')}</div>
          </div>`;
    }

    function animTermBars() {
        document.querySelectorAll('.skill-fill[data-w]').forEach(f => {
            if (!f.style.width || f.style.width === '0px') {
                f.style.width = f.dataset.w + '%';
            }
        });
    }

    function ago(d) {
        const days = Math.floor((Date.now() - new Date(d)) / 86400000);
        if (days < 1) return 'today';
        if (days < 30) return days + 'd ago';
        if (days < 365) return Math.floor(days / 30) + 'mo ago';
        return Math.floor(days / 365) + 'y ago';
    }

    // ── PANEL ──
    function openPanel() {
        const pb = document.getElementById('panel-body');
        document.getElementById('panel-title').textContent = '~/about';

        const panelSkills = [
            ['Linux Administration', 75],
            ['Computer Networking', 60],
            ['Containers (Docker/Podman)', 55],
            ['Tools (Git/Bash)', 65]
        ];

        pb.innerHTML = `
            <div class="p-section">
              <div class="p-h2">Professional Summary</div>
              <p class="p-p"><strong>Computer Engineering undergraduate</strong> specializing in <span class="hl">Linux System Administration</span> and <span class="hl">Computer Networking</span>.</p>
              <p class="p-p">Experienced in administering Linux systems within virtual lab environments — managing services, users, storage, networking, and containerized workloads using <strong>RHEL, CentOS, and Ubuntu</strong>.</p>
              <p class="p-p">Comfortable working with <strong>Docker, Podman, Git, Virtual Machines</strong>, and command-line tools while continuously building practical skills in infrastructure and automation. Currently preparing for <span class="hl">RHCSA certification</span> with long-term career goals in DevOps and Cybersecurity.</p>
              <div class="p-meta">
                <div class="p-meta-cell"><div class="pmk">location</div><div class="pmv">Ahmedabad, Gujarat, India</div></div>
                <div class="p-meta-cell"><div class="pmk">education</div><div class="pmv">B.Tech, Computer Engineering</div></div>
                <div class="p-meta-cell"><div class="pmk">focus</div><div class="pmv">Linux · Networking · DevOps</div></div>
                <div class="p-meta-cell"><div class="pmk">status</div><div class="pmv hl">open to work</div></div>
                <div class="p-meta-cell"><div class="pmk">platforms</div><div class="pmv">RHEL · CentOS · Ubuntu</div></div>
                <div class="p-meta-cell"><div class="pmk">editor</div><div class="pmv">vim</div></div>
              </div>
            </div>

            <div class="p-section">
              <div class="p-h2">Skills</div>
              ${panelSkills.map(([n, p]) => `
                <div class="p-skill">
                  <div class="ps-top"><span class="ps-name">${n}</span><span class="ps-pct">${p}%</span></div>
                  <div class="ps-bar"><div class="ps-fill" data-w="${p}"></div></div>
                </div>
              `).join('')}
            </div>

            <div class="p-section">
              <div class="p-h2">Education</div>
              <div class="p-proj">
                <h3>B.Tech, Computer Engineering</h3>
                <p>Silver Oak University, Ahmedabad, Gujarat &nbsp;·&nbsp; 2022 — 2026 &nbsp;·&nbsp; CGPA 8.26</p>
              </div>
            </div>

            <div class="p-section">
              <div class="p-h2">Labs</div>
              <div class="p-proj">
                <h3>HomeLab</h3>
                <p>Self-hosted virtual lab environment for practicing Linux system administration and networking — deploy, configure, troubleshoot, break, and rebuild systems in isolation for hands-on experience.</p>
                <div class="p-proj-tags"><span class="p-proj-tag">RHEL</span><span class="p-proj-tag">Ubuntu</span><span class="p-proj-tag">Virtual Machines</span><span class="p-proj-tag">SSH</span><span class="p-proj-tag">Networking</span></div>
              </div>
              <div class="p-proj">
                <h3>Interactive Portfolio</h3>
                <p>Terminal-inspired portfolio site built with HTML, CSS &amp; JavaScript to showcase Linux administration skills, networking knowledge, and technical projects through an interactive command-line interface.</p>
                <div class="p-proj-tags"><span class="p-proj-tag">HTML</span><span class="p-proj-tag">CSS</span><span class="p-proj-tag">JavaScript</span></div>
              </div>
            </div>
          `;

        const panelEl = document.getElementById('panel');
        panelEl.style.display = 'flex';
        requestAnimationFrame(() => { panelEl.classList.add('open'); });
        document.addEventListener('keydown', escClose);

        setTimeout(() => {
            pb.querySelectorAll('.ps-fill').forEach(f => {
                f.style.width = f.dataset.w + '%';
            });
        }, 250);
    }

    function closePanel() {
        const panelEl = document.getElementById('panel');
        panelEl.classList.remove('open');
        document.removeEventListener('keydown', escClose);
        setTimeout(() => { panelEl.style.display = 'none'; }, 380);
        cmdInput.focus();
    }

    function escClose(e) { if (e.key === 'Escape') closePanel(); }

    // Expose panel functions globally for inline onclick
    window.openPanel = openPanel;
    window.closePanel = closePanel;

    // ── TERMINAL INPUT ──
    cmdInput.addEventListener('keydown', async e => {
        if (e.key === 'Enter') {
            const raw = cmdInput.value.trim();
            const cmd = raw.toLowerCase();
            if (!cmd) { cmdInput.value = ''; return; }
            hist.unshift(cmd);
            hidx = -1;
            cmdInput.value = '';

            // echo
            const echo = mkBlock();
            echo.innerHTML = `<div class="out-echo"><span class="prompt">~</span>$ ${raw}</div>`;
            scrollTerm();

            if (commands[cmd]) {
                await commands[cmd]();
            } else {
                termHtml(`<div class="out-red">bash: ${raw}: command not found</div><div class="out-dim">Type <span class="out-amber">help</span> for available commands.</div>`);
            }
            scrollTerm();

        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (hidx < hist.length - 1) { hidx++;
                cmdInput.value = hist[hidx]; }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (hidx > 0) { hidx--;
                cmdInput.value = hist[hidx]; } else { hidx = -1;
                cmdInput.value = ''; }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            const p = cmdInput.value.trim().toLowerCase();
            const m = Object.keys(commands).filter(c => c.startsWith(p));
            if (m.length === 1) cmdInput.value = m[0];
            else if (m.length > 1) termHtml(`<div class="out-dim">${m.join(' &nbsp; ')}</div>`);
        }
    });

    document.addEventListener('click', () => {
        const panelEl = document.getElementById('panel');
        if (!panelEl.classList.contains('open')) cmdInput.focus();
    });

    // ── FOOTER LINKS ──
    document.getElementById('footer-linkedin').addEventListener('click', e => { e.preventDefault();
        window.open(LINKEDIN, '_blank'); });
    document.getElementById('footer-github').addEventListener('click', e => { e.preventDefault();
        window.open(`https://github.com/${GITHUB_USER}`, '_blank'); });
    document.getElementById('footer-email').addEventListener('click', e => { e.preventDefault();
        window.location.href = `mailto:${EMAIL}`; });

    // ── START ──
    boot();

}); // end DOMContentLoaded