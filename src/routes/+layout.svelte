<script>
	import '../app.css';
	import Header from '$components/header/Header.svelte';
	import Footer from '$components/footer/Footer.svelte';
</script>

<Header></Header>
<slot />
<Footer></Footer>
