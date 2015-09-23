// autogenerated by sql-generate v1.0.0 on Wed Sep 23 2015 09:22:21 GMT+0000 (UTC)

var sql = require('sql');


/**
 * SQL definition for public.alexa_rank_cache
 */
exports.alexa_rank_cache = sql.define({
	name: 'alexa_rank_cache',
	columns: [
		{ name: 'site_domain' },
		{ name: 'rank' },
		{ name: 'download_date' }
	]
});


/**
 * SQL definition for public.annotation_tasks
 */
exports.annotation_tasks = sql.define({
	name: 'annotation_tasks',
	columns: [
		{ name: 'created_at' },
		{ name: 'updated_at' },
		{ name: 'id' },
		{ name: 'type' },
		{ name: 'resource_id' },
		{ name: 'territoire_id' },
		{ name: 'status' }
	]
});


/**
 * SQL definition for public.expression_domains
 */
exports.expression_domains = sql.define({
	name: 'expression_domains',
	columns: [
		{ name: 'created_at' },
		{ name: 'updated_at' },
		{ name: 'id' },
		{ name: 'string' },
		{ name: 'main_url' },
		{ name: 'title' },
		{ name: 'description' },
		{ name: 'keywords' }
	]
});


/**
 * SQL definition for public.expressions
 */
exports.expressions = sql.define({
	name: 'expressions',
	columns: [
		{ name: 'created_at' },
		{ name: 'updated_at' },
		{ name: 'id' },
		{ name: 'main_html' },
		{ name: 'main_text' },
		{ name: 'title' },
		{ name: 'meta_description' }
	]
});


/**
 * SQL definition for public.get_expression_tasks
 */
exports.get_expression_tasks = sql.define({
	name: 'get_expression_tasks',
	columns: [
		{ name: 'created_at' },
		{ name: 'updated_at' },
		{ name: 'id' },
		{ name: 'resource_id' },
		{ name: 'status' },
		{ name: 'territoire_id' },
		{ name: 'depth' }
	]
});


/**
 * SQL definition for public.lifecycle
 */
exports.lifecycle = sql.define({
	name: 'lifecycle',
	columns: [
		{ name: 'created_at' },
		{ name: 'updated_at' }
	]
});


/**
 * SQL definition for public.links
 */
exports.links = sql.define({
	name: 'links',
	columns: [
		{ name: 'created_at' },
		{ name: 'updated_at' },
		{ name: 'source' },
		{ name: 'target' }
	]
});


/**
 * SQL definition for public.resource_annotations
 */
exports.resource_annotations = sql.define({
	name: 'resource_annotations',
	columns: [
		{ name: 'created_at' },
		{ name: 'updated_at' },
		{ name: 'approved' },
		{ name: 'values' },
		{ name: 'expression_domain_id' },
		{ name: 'resource_id' },
		{ name: 'territoire_id' },
		{ name: 'user_id' }
	]
});


/**
 * SQL definition for public.resources
 */
exports.resources = sql.define({
	name: 'resources',
	columns: [
		{ name: 'created_at' },
		{ name: 'updated_at' },
		{ name: 'id' },
		{ name: 'url' },
		{ name: 'alias_of' },
		{ name: 'expression_id' },
		{ name: 'http_status' },
		{ name: 'content_type' },
		{ name: 'other_error' }
	]
});


