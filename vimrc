let mapleader = ","

if executable('/bin/zsh')
  set shell=/bin/zsh
endif

set nocompatible
filetype off
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()

Plugin 'gmarik/vundle'
Plugin 'vim-scripts/bufkill.vim'
Plugin 'kien/ctrlp.vim'
Plugin 'tpope/vim-fugitive'
Plugin 'tpope/vim-commentary'
Plugin 'tpope/vim-sensible'
Plugin 'epmatsw/ag.vim'
Plugin 'vim-ruby/vim-ruby'
Plugin 'ervandew/supertab'
Plugin 'elzr/vim-json'
Plugin 'skalnik/vim-vroom'
Plugin 'airblade/vim-gitgutter'
Plugin 'majutsushi/tagbar'

call vundle#end()
filetype plugin indent on

set shell=/bin/sh
set term=xterm-256color
set background=dark

set number
set expandtab
set hlsearch
set splitright
set splitbelow
set smartindent
set mouse=a
set mousehide
set shiftwidth=2
set tabstop=2
set noerrorbells visualbell t_vb=
set colorcolumn=80

map <leader>, :%s/\s\+$//<CR>
map <leader>ff :Ag<space>""<left>
map <leader>§ :%s/:\([^ ]*\)\(\s*\)=>/\1:/g<cr>
map <silent> <leader><cr> :noh<cr>

" Useful mappings for managing tabs
map <leader>tn :tabnew<cr>
map <leader>] :tabn<cr>
map <leader>[ :tabp<cr>

" Smart way to move between windows
map <C-j> <C-W>j
map <C-k> <C-W>k
map <C-h> <C-W>h
map <C-l> <C-W>l

" Vim Hardcore
map <Left> :echo "Try H!"<cr>
map <Right> :echo "Try L!"<cr>
map <Up> :echo "Try K!"<cr>
map <Down> :echo "Try J!"<cr>

if has("autocmd")
  au FileType make set noexpandtab
  au BufRead,BufNewFile *.{md,markdown,mdown,mkd,mkdn,txt} setf markdown
  au BufNewFile,BufRead *.json set ft=javascript
  au BufNewFile,BufRead *.es6 set ft=javascript

  augroup RubyShenanigans
    au!
    autocmd BufRead,BufNewFile Gemfile,Rakefile,Capfile
      \ set filetype=ruby
  augroup END
endif

" Specify the behavior when switching between buffers 
try
  set switchbuf=useopen,usetab,newtab
  set stal=2
catch
endtry

" The Silver Searcher
if executable('ag')
  " Use ag over grep
  set grepprg=ag\ --nogroup\ --nocolor

  " Use ag in CtrlP for listing files. Lightning fast and respects .gitignore
  let g:ctrlp_user_command = 'ag %s -l --nocolor -g ""'

  " ag is fast enough that CtrlP doesn't need to cache
  let g:ctrlp_use_caching = 0
endif

" bind K to grep word under cursor
nnoremap K :grep! "\b<C-R><C-W>\b"<CR>:cw<CR>

let g:ctrlp_match_window_bottom = 0
let g:ctrlp_map = '<c-p>'
let g:ctrlp_show_hidden = 1
let g:ctrlp_mruf_max = 250
nnoremap <c-b> :CtrlPBuffer<cr>
nnoremap <c-f> :CtrlPMRU<cr>
