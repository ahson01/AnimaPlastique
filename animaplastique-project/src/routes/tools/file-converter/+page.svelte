<script>
  import { Upload, Download, FileText, AlertCircle, CheckCircle2, Loader2 } from 'lucide-svelte';

  let file = null;
  let converting = false;
  let convertedFile = null;
  let error = '';
  let outputFormat = '';
  let fileInputRef;

  const formatGroups = {
    image: ['png', 'jpg', 'webp', 'bmp', 'gif'],
    document: ['txt', 'md', 'csv', 'json'],
    data: ['json', 'csv', 'xml']
  };

  function getFileType(filename) {
    const ext = filename.split('.').pop().toLowerCase();
    if (formatGroups.image.includes(ext)) return 'image';
    if (formatGroups.document.includes(ext)) return 'document';
    if (formatGroups.data.includes(ext)) return 'data';
    return 'unknown';
  }

  function getAvailableFormats(fileType) {
    switch (fileType) {
      case 'image':
        return ['png', 'jpg', 'webp', 'bmp'];
      case 'document':
      case 'data':
        return ['txt', 'json', 'csv', 'md'];
      default:
        return [];
    }
  }

  function handleFileSelect(e) {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      file = selectedFile;
      convertedFile = null;
      error = '';
      const fileType = getFileType(selectedFile.name);
      const formats = getAvailableFormats(fileType);
      outputFormat = formats[0] || '';
    }
  }

  async function convertImageWithCanvas(file, targetFormat) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);

          canvas.toBlob((blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Canvas conversion failed'));
            }
          }, `image/${targetFormat === 'jpg' ? 'jpeg' : targetFormat}`, 0.95);
        };
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = e.target.result;
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  }

  async function convertTextFormat(file, targetFormat) {
    const text = await file.text();
    let converted = text;

    const currentExt = file.name.split('.').pop().toLowerCase();

    if (currentExt === 'json' && targetFormat === 'csv') {
      try {
        const data = JSON.parse(text);
        const array = Array.isArray(data) ? data : [data];
        if (array.length === 0) {
          converted = '';
        } else {
          const headers = Object.keys(array[0]);
          const rows = array.map(obj => 
            headers.map(h => JSON.stringify(obj[h] ?? '')).join(',')
          );
          converted = [headers.join(','), ...rows].join('\n');
        }
      } catch (e) {
        throw new Error('Invalid JSON format');
      }
    } else if (currentExt === 'csv' && targetFormat === 'json') {
      const lines = text.split('\n').filter(l => l.trim());
      if (lines.length < 2) {
        converted = '[]';
      } else {
        const headers = lines[0].split(',').map(h => h.trim());
        const data = lines.slice(1).map(line => {
          const values = line.split(',');
          return headers.reduce((obj, header, i) => {
            try {
              obj[header] = JSON.parse(values[i] || 'null');
            } catch {
              obj[header] = values[i]?.trim() || '';
            }
            return obj;
          }, {});
        });
        converted = JSON.stringify(data, null, 2);
      }
    }

    return new Blob([converted], { type: 'text/plain' });
  }

  async function handleConvert() {
    if (!file || !outputFormat) return;

    converting = true;
    error = '';
    convertedFile = null;

    try {
      const fileType = getFileType(file.name);
      let blob;

      if (fileType === 'image') {
        blob = await convertImageWithCanvas(file, outputFormat);
      } else {
        blob = await convertTextFormat(file, outputFormat);
      }

      const originalName = file.name.split('.').slice(0, -1).join('.');
      const newFile = new File([blob], `${originalName}.${outputFormat}`, {
        type: blob.type
      });

      convertedFile = newFile;
    } catch (err) {
      error = err.message || 'Conversion failed';
    } finally {
      converting = false;
    }
  }

  function handleDownload() {
    if (!convertedFile) return;

    const url = URL.createObjectURL(convertedFile);
    const a = document.createElement('a');
    a.href = url;
    a.download = convertedFile.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  $: fileType = file ? getFileType(file.name) : null;
  $: availableFormats = fileType ? getAvailableFormats(fileType) : [];
</script>

<svelte:head>
  <title>File Converter - WASM Powered</title>
</svelte:head>

<style>
  @keyframes pop-up {
    0% {
      opacity: 0;
      transform: translateY(10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-pop-up {
    animation: pop-up 0.6s ease-out forwards;
    animation-delay: var(--delay, 0s);
    opacity: 0;
  }
  
  @keyframes reveal {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .reveal-line {
    display: block;
    animation: reveal 0.8s ease-out forwards;
    animation-delay: calc(var(--line-index, 0) * 0.1s);
    opacity: 0;
  }
  
  .reveal-line:nth-child(1) { --line-index: 0; }
  .reveal-line:nth-child(2) { --line-index: 1; }
  .reveal-line:nth-child(3) { --line-index: 2; }
  .reveal-line:nth-child(4) { --line-index: 3; }
</style>

<section class="relative flex w-full justify-center overflow-hidden min-h-screen bg-neutral-50 dark:bg-neutral-950">
  <!-- Soft background glows -->
  <div class="pointer-events-none absolute inset-0 -z-10">
    <div class="absolute -top-32 -left-24 h-72 w-72 rounded-full blur-3xl opacity-25 bg-[radial-gradient(closest-side,rgba(255,255,255,0.6),transparent)] dark:opacity-20"></div>
    <div class="absolute -bottom-24 -right-24 h-96 w-96 rounded-full blur-3xl opacity-20 bg-[radial-gradient(closest-side,rgba(0,0,0,0.3),transparent)] dark:opacity-30"></div>
    <div class="absolute bottom-0 right-0 h-[40rem] w-[40rem] translate-x-1/3 translate-y-1/3 rounded-full blur-[120px] opacity-40 bg-[radial-gradient(closest-side,rgba(180,30,40,0.4),transparent)] dark:opacity-60 dark:bg-[radial-gradient(closest-side,rgba(220,50,60,0.35),transparent)]"></div>
  </div>

  <div class="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pt-18 pb-24 lg:pt-22">
    <!-- Hero Section -->
    <div class="flex flex-col gap-12 lg:flex-row lg:items-start">
      <!-- Left -->
      <div class="max-w-3xl space-y-7">
        <p class="font-mono text-[0.65rem] uppercase tracking-[0.35em] bg-gradient-to-r from-rose-400 to-red-500 bg-clip-text text-transparent animate-pop-up">
          WASM File Converter · Privacy-first
        </p>
        <p class="max-w-xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          Conversions that happen entirely on your device. No uploads, no servers, no tracking. Your files never leave your browser.
        </p>

        <div 
          class="border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-xl p-8 text-center hover:border-rose-400 dark:hover:border-rose-500 transition-colors cursor-pointer animate-pop-up"
          style="--delay: 0.3s;"
          on:click={() => fileInputRef?.click()}
          on:keydown={(e) => e.key === 'Enter' && fileInputRef?.click()}
          role="button"
          tabindex="0"
        >
          <input
            bind:this={fileInputRef}
            type="file"
            on:change={handleFileSelect}
            class="hidden"
            accept="image/*,.txt,.md,.csv,.json,.xml"
          />
          <Upload class="w-12 h-12 mx-auto text-neutral-400 dark:text-neutral-500 mb-4" />
          <p class="text-neutral-900 dark:text-neutral-100 mb-2 font-medium">
            {file ? file.name : 'Click to upload a file'}
          </p>
          <p class="text-xs uppercase tracking-[0.2em] font-mono text-neutral-500 dark:text-neutral-500">
            Images · Text · JSON · CSV
          </p>
        </div>

        {#if file && availableFormats.length > 0}
          <div class="animate-pop-up" style="--delay: 0.4s;">
            <label class="block text-xs uppercase tracking-[0.25em] font-mono text-neutral-600 dark:text-neutral-400 mb-3">
              Convert to:
            </label>
            <div class="grid grid-cols-4 gap-2">
              {#each availableFormats as format}
                <button
                  on:click={() => outputFormat = format}
                  class="px-4 py-2.5 rounded-full font-mono text-[0.7rem] uppercase tracking-[0.2em] transition-all {
                    outputFormat === format
                      ? 'bg-neutral-900 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-900 shadow-md'
                      : 'border border-neutral-900/20 dark:border-neutral-50/20 bg-transparent text-neutral-900 dark:text-neutral-50 hover:bg-neutral-900/5 dark:hover:bg-neutral-50/10'
                  }"
                >
                  {format}
                </button>
              {/each}
            </div>
          </div>
        {/if}

        {#if file && outputFormat}
          <button
            on:click={handleConvert}
            disabled={converting}
            class="inline-flex items-center justify-center gap-2 rounded-full border px-6 py-2.5 text-[0.7rem] uppercase tracking-[0.22em] border-neutral-900/20 bg-neutral-900 text-neutral-50 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/70 focus-visible:ring-offset-2 dark:border-neutral-50/15 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none animate-pop-up"
            style="--delay: 0.5s;"
          >
            {#if converting}
              <Loader2 class="w-4 h-4 animate-spin" />
              Converting
            {:else}
              <FileText class="w-4 h-4" />
              Convert File
            {/if}
          </button>
        {/if}
      </div>

      <!-- Right - Info Card -->
      <div class="grid w-full max-w-sm gap-4 rounded-2xl p-5 text-xs sm:text-[0.7rem] border border-black/10 bg-white/40 shadow-lg backdrop-blur-md ring-1 ring-black/5 dark:border-white/10 dark:bg-white/5 dark:ring-white/5 animate-pop-up" style="--delay: 0.2s;">
        <div class="flex items-baseline justify-between border-b pb-3 border-black/10 dark:border-white/10">
          <span class="font-mono text-[0.7rem] uppercase tracking-[0.25em]">
            Features
          </span>
        </div>

        <div class="flex items-baseline justify-between">
          <span class="font-mono uppercase tracking-[0.25em]">Processing</span>
          <span class="font-mono text-[0.75rem]">Instant</span>
        </div>

        <div class="flex items-baseline justify-between">
          <span class="font-mono uppercase tracking-[0.25em]">Privacy</span>
          <span class="font-mono text-[0.75rem] text-neutral-600 dark:text-neutral-400">
            100% local
          </span>
        </div>

        <div class="flex items-baseline justify-between">
          <span class="font-mono uppercase tracking-[0.25em]">Supported</span>
          <span class="font-mono text-[0.75rem] text-neutral-600 dark:text-neutral-400">
            Images · Data
          </span>
        </div>

        <div class="flex items-baseline justify-between">
          <span class="font-mono uppercase tracking-[0.25em]">Size limit</span>
          <span class="font-mono text-[0.75rem] text-neutral-600 dark:text-neutral-400">
            Browser only
          </span>
        </div>

        <div class="flex items-baseline justify-between">
          <span class="font-mono uppercase tracking-[0.25em]">Cost</span>
          <span class="font-mono text-[0.75rem]">Free forever</span>
        </div>

        <div class="flex items-baseline justify-between">
          <span class="font-mono uppercase tracking-[0.25em]">Technology</span>
          <span class="font-mono text-[0.75rem] text-neutral-600 dark:text-neutral-400">
            WebAssembly
          </span>
        </div>
      </div>
    </div>

    <!-- Status Messages -->
    {#if error}
      <div class="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 rounded-xl p-4 flex items-start gap-3 animate-pop-up">
        <AlertCircle class="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
        <div>
          <p class="font-mono text-xs uppercase tracking-[0.2em] text-red-800 dark:text-red-300">Conversion Error</p>
          <p class="text-sm text-red-600 dark:text-red-400 mt-1">{error}</p>
        </div>
      </div>
    {/if}

    {#if convertedFile}
      <div class="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800/50 rounded-xl p-4 animate-pop-up">
        <div class="flex items-start gap-3 mb-4">
          <CheckCircle2 class="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
          <div class="flex-1">
            <p class="font-mono text-xs uppercase tracking-[0.2em] text-green-800 dark:text-green-300">Conversion Complete</p>
            <p class="text-sm text-green-600 dark:text-green-400 mt-1">{convertedFile.name}</p>
            <p class="text-xs font-mono text-green-500 dark:text-green-500 mt-1">
              {(convertedFile.size / 1024).toFixed(2)} KB
            </p>
          </div>
        </div>
        <button
          on:click={handleDownload}
          class="w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-2.5 text-[0.7rem] uppercase tracking-[0.22em] border-green-900/20 bg-green-900 text-green-50 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg dark:bg-green-50 dark:text-green-900"
        >
          <Download class="w-4 h-4" />
          Download File
        </button>
      </div>
    {/if}


  </div>


</section>